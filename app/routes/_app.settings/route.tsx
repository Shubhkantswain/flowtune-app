import React, { useEffect, useState } from 'react';
import { Search, Edit2, ChevronDown } from 'lucide-react';
import { Switch } from '~/components/ui/switch';
import { useCurrentUser } from '~/hooks/auth';
import { ActionFunctionArgs, json } from '@remix-run/cloudflare';
import { MusicPreferenceData } from '../_app.music-preference/route';
import { createGraphqlClient } from '~/clients/api';
import { ChangeMusicPreferenceMutation } from '~/graphql/mutations/user';
import { Form, Link, useActionData, useNavigation } from '@remix-run/react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import Footer from '../../components/Footer';

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
            cookie: "authToken",
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

const SpotifySettings = () => {
    const musicPreferenceData = useActionData<MusicPreferenceData>()
    const [compactLibrary, setCompactLibrary] = useState(false);
    const [showNowPlaying, setShowNowPlaying] = useState(true);
    const [showVisuals, setShowVisuals] = useState(true);
    const [language, setLanguage] = useState("");
    const [initialLanguage, setInitialLanguage] = useState("");
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [videoEnabled, setVideoEnabled] = useState(false)
    const [showQueue, setShowQueue] = useState(false)
    const { data } = useCurrentUser()

    useEffect(() => {
        if (data) {
            setLanguage(data.language);
            setInitialLanguage(data.language);
        }
    }, [data])

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    }

    const navigation = useNavigation()
    const isSubmitting = navigation.state === "submitting";

    const queryClient = useQueryClient()
    useEffect(() => {
        if (musicPreferenceData?.isSuccess) {
            toast.success("Changes applied successfully");
            setInitialLanguage(language)
            queryClient.setQueryData(["currentUser"], { ...data, language })
            localStorage.setItem("__FlowTune_Token", musicPreferenceData.cookie)
        }
    }, [musicPreferenceData]);

    useEffect(() => {
        const enabled = localStorage.getItem("videoEnabled")
        if (enabled == null) {
            setVideoEnabled(true)
        } else {
            if (enabled == "true") {
                setVideoEnabled(true)
            } else if (enabled == "false") {
                setVideoEnabled(false)
            } else {
                setVideoEnabled(false)
            }
        }

        const showQueue = localStorage.getItem("showQueue")
        if (showQueue == null) {
            setShowQueue(true)
        } else {
            if (showQueue == "true") {
                setShowQueue(true)
            } else if (showQueue == "false") {
                setShowQueue(false)
            } else {
                setShowQueue(false)
            }
        }
    }, [])

    return (
        <>
            <div className="text-white p-6">
                <div className="max-w-3xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold">Settings</h1>
                        <div className="flex items-center">
                            {showSearchBar && (
                                <input
                                    type="text"
                                    placeholder="Search settings..."
                                    className="bg-gray-800 text-white text-sm rounded-md px-3 py-1 mr-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                                />
                            )}
                            <Search
                                className="text-gray-400 cursor-pointer"
                                size={20}
                                onClick={() => setShowSearchBar(!showSearchBar)}
                            />
                        </div>
                    </div>

                    <div className="space-y-12">
                        {/* Account Section */}
                        <div>
                            <h2 className="text-lg font-semibold mb-3">Account</h2>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-400 text-sm">Edit login methods</p>
                                <Link to={"/account/edit"} className="border border-[#ffffff] rounded-full px-3 py-1 flex items-center gap-1 text-sm">
                                    Edit <Edit2 size={14} />
                                </Link>
                            </div>
                        </div>

                        {/* Music Section */}
                        <div>
                            <h2 className="text-lg font-semibold mb-3">Music Preference</h2>
                            <div className="flex flex-col gap-3">
                                <Form method="post" className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-400 text-sm">Choose music preference - Changes will be applied</p>
                                        <div className="relative inline-block w-48">
                                            <select
                                                name="language"  // Add name attribute for form submission
                                                value={language}
                                                onChange={handleLanguageChange}
                                                className="bg-[#333333] text-white text-sm rounded-md px-4 py-2 w-full appearance-none border-none focus:outline-none focus:ring-1 focus:ring-gray-700"
                                            >
                                                {musicLanguages.map((lang) => (
                                                    <option key={lang.name} value={lang.name}>
                                                        {lang.name} ({lang.native})
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                                <ChevronDown size={16} className="text-gray-400" strokeWidth={2} />
                                            </div>
                                        </div>
                                    </div>
                                    {language !== initialLanguage && (
                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                className="bg-[#25d1da] text-white px-4 py-2 rounded-md text-sm hover:bg-[#25d1da] transition-colors"
                                            >
                                                {isSubmitting ? "Applying..." : "Apply Changes"}
                                            </button>
                                        </div>
                                    )}
                                </Form>
                            </div>
                        </div>

                        {/* Library Section */}
                        <div>
                            <h2 className="text-lg font-semibold mb-3">Show queue</h2>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-400 text-sm">Use the beautiful queue section</p>
                                <Switch
                                    checked={showQueue}
                                    onCheckedChange={(checked: boolean) => {
                                        if (checked) {
                                            if (typeof window !== "undefined") {
                                                localStorage.setItem("showQueue", "true");
                                            }
                                            toast.success("Now you can see queue section, Enjoy");
                                        } else {
                                            if (typeof window !== "undefined") {
                                                localStorage.setItem("showQueue", "false");
                                            }
                                            toast.success("queue section is disabled");
                                        }

                                        setShowQueue(!showQueue);
                                    }}
                                    className="data-[state=checked]:bg-[#25d1da]"
                                />
                            </div>
                        </div>

                        {/* Display Section */}
                        <div>
                            <h2 className="text-lg font-semibold mb-3">Display</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-400 text-sm">Show the background video in tracks</p>
                                    <Switch
                                        checked={videoEnabled}
                                        onCheckedChange={(checked: boolean) => {
                                            if (checked) {
                                                if (typeof window !== "undefined") {
                                                    localStorage.setItem("videoEnabled", "true");
                                                }
                                                toast.success("Background video is enabled, Enjoy");
                                            } else {
                                                if (typeof window !== "undefined") {
                                                    localStorage.setItem("videoEnabled", "false");
                                                }
                                                toast.success("Background video is disabled");
                                            }

                                            setVideoEnabled(!videoEnabled);
                                        }}
                                        className="data-[state=checked]:bg-[#25d1da]"
                                    />
                                </div>

                              
                            </div>
                        </div>

                        {/* Tooltip Section */}
                        <div>
                            <h2 className="text-lg font-semibold mb-3">Tooltip</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-400 text-sm">Show tooltip for begginer friendly</p>
                                    <Switch
                                        checked={videoEnabled}
                                        onCheckedChange={(checked: boolean) => {
                                            if (checked) {
                                                if (typeof window !== "undefined") {
                                                    localStorage.setItem("videoEnabled", "true");
                                                }
                                                toast.success("Background video is enabled, Enjoy");
                                            } else {
                                                if (typeof window !== "undefined") {
                                                    localStorage.setItem("videoEnabled", "false");
                                                }
                                                toast.success("Background video is disabled");
                                            }

                                            setVideoEnabled(!videoEnabled);
                                        }}
                                        className="data-[state=checked]:bg-[#25d1da]"
                                    />
                                </div>

                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default SpotifySettings;