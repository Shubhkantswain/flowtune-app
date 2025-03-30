import { ActionFunctionArgs, json } from "@remix-run/cloudflare";
import { Form, useActionData, useLoaderData, useNavigate, useNavigation } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { createGraphqlClient } from "~/clients/api";
import { ChangeMusicPreferenceMutation } from "~/graphql/mutations/user";
import { useCurrentUser } from "~/hooks/auth";
import GeneralError from "../_auth/Components/GeneralError";

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
      isSuccess: true
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
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const toggleLanguage = (language: string) => {
    setSelectedLanguage(language)
  };

  console.log(selectedLanguage);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const navigate = useNavigate()
  const musicPreferenceData = useActionData<MusicPreferenceData>()

  useEffect(() => {
    if (data) {
      setSelectedLanguage(data?.language)
    }
  }, [data])

  console.log("musicPreferenceData.isSuccess", musicPreferenceData?.errors?.general);
  useEffect(() => {
    if (musicPreferenceData?.isSuccess) {
      toast.success("Changes applied successfully");
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
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={() => navigate(-1)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
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
                    className={`focus:outline-none ${selectedLanguage == language.name ? "text-[#fa586a]" : ""}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><path id="ic_action_like-a" d="M20.999,9 L17,9 L16.59,9 C15.87,9 15.42,8.24 15.77,7.61 L15.92,7.34 C16.46,6.35 16.77,5.24 16.72,4.12 C16.68,3.37 16.54,2.63 16.3,1.91 C16.12,1.37 15.61,1 15.04,1 C14.43,1 13.9,1.42 13.75,2.01 L13.39,3.45 C13.13,4.47 12.66,5.42 12,6.24 L9.71,9.12 C9.26,9.67 8.58,10 7.87,10 C7.39,10 7,10.39 7,10.87 L7,21 C7,21.55 7.45,22 8,22 L12.707,22 L16,22 L18.229,22 C19.107,22 19.882,21.427 20.141,20.588 L22.91,11.588 C23.306,10.302 22.344,9 20.999,9 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><path fill="currentColor" d="M5,23 L2,23 C1.448,23 1,22.552 1,22 L1,10 C1,9.448 1.448,9 2,9 L5,9 C5.552,9 6,9.448 6,10 L6,22 C6,22.552 5.552,23 5,23 Z" opacity=".5"></path><use href="#ic_action_like-a" fill="currentColor"></use></g></svg>
                  </button>
                </div>
              ))}

              <Form method="post">
                <input type="hidden" name="language" value={selectedLanguage} />

                {data?.language !== selectedLanguage && !isLoading && (
                  <div className="p-4 mt-5">
                    <button
                      type="submit"
                      disabled={false}
                      className="w-full py-3 bg-[#fa586a] hover:bg-[#e04a5a] text-white font-medium rounded-lg transition-colors disabled:opacity-50"
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