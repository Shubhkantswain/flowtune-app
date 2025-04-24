import { ActionFunctionArgs, json } from "@remix-run/cloudflare";
import { Form, useActionData, useLoaderData, useNavigate, useNavigation } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { createGraphqlClient } from "~/clients/api";
import { ChangeMusicPreferenceMutation } from "~/graphql/mutations/user";
import { useCurrentUser } from "~/hooks/auth";
import GeneralError from "../_auth/Components/GeneralError";
import { useQueryClient } from "@tanstack/react-query";
import { CrossIcon, ThumbsUpIcon } from "~/Svgs";

const musicLanguages = [
  { name: "Hindi", native: "हिन्दी" },
  { name: "English", native: "English" },
  { name: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { name: "Tamil", native: "தமிழ்" },
  { name: "Telugu", native: "తెలుగు" },
  { name: "Kannada", native: "ಕನ್ನಡ" },
  { name: "Bengali", native: "বাংলা" },
  { name: "Marathi", native: "मराठी" },
  { name: "Gujarati", native: "ગુજરાતી" },
  { name: "Malayalam", native: "മലയാളം" },
];


export interface MusicPreferenceData {
  isSuccess: boolean;
  cookie: string;
  errors?: {
    general?: string;
  };
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const cookieHeader = request.headers.get("Cookie");

  // Parse the cookie manually
  const cookies = Object.fromEntries(
    (cookieHeader || "")
      .split("; ")
      .map((c) => c.split("="))
      .map(([key, ...value]) => [key, value.join("=")])
  );

  // Extract the `__FlowTune_Token_server` cookie
  const token = cookies["__FlowTune_Token_server"];

  if (!token) {
    return json<MusicPreferenceData>(
      {
        isSuccess: false,
        cookie: "",
        errors: {
          general: "Please Login/Sign Up First"
        }
      },
      { status: 500 }
    );
  }
  const formData = await request.formData();

  const language = formData.get("language")?.toString().trim() ?? "";

  try {
    const graphqlClient = createGraphqlClient(token);
    const { changeMusicPreference } = await graphqlClient.request(ChangeMusicPreferenceMutation, { language });

    const authToken = changeMusicPreference
    return json<MusicPreferenceData>({
      isSuccess: true,
      cookie: authToken
    },
      {
        status: 200,
        headers: {
          "Set-Cookie": `__FlowTune_Token_server=${authToken}; Max-Age=86400; HttpOnly; Secure; Path=/; SameSite=None`,
        },
      }
    );

  } catch (error: any) {
    return json<MusicPreferenceData>(
      {
        isSuccess: false,
        cookie: "",
        errors: {
          general: error?.response?.errors?.[0]?.message || "Something went wrong"
        }
      },
      { status: 500 }
    );
  }
}


const MusicPreferencesModal = () => {
  const { data, isLoading } = useCurrentUser()
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const toggleLanguage = (language: string) => {
    setSelectedLanguage(language)
  };

  console.log(selectedLanguage);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const navigate = useNavigate()
  const musicPreferenceData = useActionData<MusicPreferenceData>()
  const queryClient = useQueryClient()

  useEffect(() => {
    // Set language from data if available
    if (data?.language) {
      setSelectedLanguage(data.language);
      return;
    }

    // Default to Hindi if no data is available and loading is complete
    if (!isLoading && !data) {
      setSelectedLanguage("Hindi");
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (musicPreferenceData?.isSuccess) {
      toast.success("Changes applied successfully");
      queryClient.setQueryData(["currentUser"], { ...data, language: selectedLanguage });
      localStorage.setItem("__FlowTune_Token", musicPreferenceData.cookie)
      navigate(-1)
    }
  }, [musicPreferenceData]);

  return (
    <div className="fixed inset-0  overflow-y-auto custom-scrollbar z-50 bg-black/50 backdrop-blur-2xl hide-scrollbar ">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative w-full max-w-md">
          <div className="rounded-lg  overflow-hidden">
            <div className="relative p-6">
              <button
                className="absolute top-4 right-4 text-white hover:text-[#93D0D5]"
                onClick={() => navigate(-1)}
              >
                <CrossIcon width="24" height="24" />

              </button>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white">Music Preferences</h2>
                <p className="text-gray-300 mt-2">Set your preferences to discover music you love.</p>
              </div>

              {musicPreferenceData?.errors?.general && (
                <GeneralError error={musicPreferenceData.errors.general} />
              )}

              {musicLanguages.map((language) => (
                <div
                  key={language.name}
                  className="flex items-center justify-between py-4 border-b cursor-pointer p-3 border-[#706a65] hover:bg-white/15 hover:backdrop-filter hover:backdrop-blur-sm"
                  onClick={() => toggleLanguage(language.name)}
                >
                  <div className="flex flex-col">
                    <span className="text-white font-medium">{language.name}</span>
                    <span className="text-gray-400 text-sm">{language.native}</span>
                  </div>
                  <button
                    className={`focus:outline-none ${selectedLanguage == language.name ? "text-[#25d1da]" : ""}`}
                  >
                    <ThumbsUpIcon width="24" height="24" />
                  </button>
                </div>
              ))}

              <Form method="post">
                <input type="hidden" name="language" value={selectedLanguage} />

                {((data ? data.language : "Hindi") !== selectedLanguage && !isLoading && selectedLanguage !== "") && (
                  <div className="p-4 mt-5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-[#25d1da] hover:bg-[#e04a5a] text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? "Applying..." : "Apply Changes"}
                    </button>
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default MusicPreferencesModal;