import React, { useRef, useState } from 'react';
import { useCurrentUser } from '~/hooks/auth';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import usePreviewFile from '~/hooks/image';
import { IconArrowUp, IconCamera, IconCreditCard, IconLock, IconSave, IconStar, IconUser, IconX, IconZap } from '~/svg';
import { ActionFunctionArgs, json } from '@remix-run/cloudflare';
import { createGraphqlClient } from '~/clients/api';
import { UpdateUserProfileMutation } from '~/graphql/mutations/user';
import GeneralError from '../_auth/Components/GeneralError';

// Skeleton Component (static, no animation)
const Skeleton = ({ className }) => (
  <div className={`bg-white/20 ${className}`}></div>
);\

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

interface updateUserProfileData {
  isSuccess: boolean,
  errors?: {
    password?: string;
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

  const formData = await request.formData();
  const imgUrl = formData.get("imgUrl")?.toString().trim() ?? "";
  const username = formData.get("username")?.toString().trim() ?? "";
  const fullName = formData.get("fullName")?.toString().trim() ?? "";
  const oldPassword = formData.get("oldPassword")?.toString().trim() ?? "";
  const newPassword = formData.get("newPassword")?.toString().trim() ?? "";
  const bio = formData.get("bio")?.toString().trim() ?? "";

  let errors: updateUserProfileData["errors"] = {};

  if ((oldPassword && !newPassword) || (!oldPassword && newPassword)) {
    errors.password = "Both the current and new passwords are required to update your password.";
  }

  if (oldPassword === newPassword && newPassword) {
    errors.password = "The new password must be different from the current password.";
  }

  if (Object.keys(errors).length > 0) {
    return json<updateUserProfileData>({ isSuccess: false, errors }, { status: 400 });
  }

  try {
    const graphqlClient = createGraphqlClient(token);
    const { updateUserProfile } = await graphqlClient.request(UpdateUserProfileMutation, { payload: { imgUrl, username, fullName, oldPassword, newPassword, bio } })

    return json<updateUserProfileData>({
      isSuccess: updateUserProfile
    })

  } catch (error: any) {
    return json<updateUserProfileData>(
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

const EditProfilePage = () => {
  const actionData = useActionData<updateUserProfileData>()
  const { data, isLoading } = useCurrentUser();

  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const { handleFileChange: handleImgChange, fileURL: imgUrl } = usePreviewFile("image");
  const imageInputRef = useRef<HTMLInputElement>(null);

  const dismissNotification = () => {
    setNotification({ show: false, message: '', type: '' });
  };

  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting";

  const handleChange = () => {

  }



  return (
    <div className="bg-black min-h-screen text-gray-300">
      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Notification */}
        {notification.show && (
          <div className={`mb-6 p-4 rounded-lg flex items-center justify-between ${notification.type === 'success' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
            }`}>
            <span>{notification.message}</span>
            <button onClick={dismissNotification} className="text-gray-400 hover:text-gray-200">
              <IconX />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - Profile photo */}
          <div className="bg-black p-6 rounded-lg border-[0.5px] border-[#ffffff]">
            {isLoading ? (
              <div className="flex flex-col items-center space-y-4">
                <Skeleton className="w-40 h-40 rounded-full" />
                <Skeleton className="w-32 h-6 rounded" />
                <Skeleton className="w-40 h-8 rounded-full" />
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <input
                  type="file"
                  ref={imageInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImgChange}
                />

                <div className="relative">
                  <div className="w-40 h-40 rounded-full bg-gray-900 overflow-hidden">
                    <img
                      src={imgUrl ? imgUrl : data?.profileImageURL || "https://www.shutterstock.com/image-vector/male-default-avatar-profile-icon-600nw-1725062341.jpg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    className="absolute bottom-0 right-0 bg-[#333333] hover:bg-[#252424] text-white p-2 rounded-full hover:bg-black/60 transition-colors"
                    onClick={() => imageInputRef.current?.click()}
                  >
                    <IconCamera />
                  </button>

                </div>
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-white">{data?.username}</h2>
                </div>

                {/* Premium badge */}
                {data?.isPro && (
                  <div className="bg-gradient-to-r from-yellow-600 to-amber-600 text-black px-4 py-2 rounded-full flex items-center gap-2 font-semibold">
                    <IconStar />
                    <span>Pro Member</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right column - Profile information */}
          <div className="md:col-span-2 space-y-8">
            {/* Premium Section */}
            {isLoading ? (
              <div className="bg-black p-6 rounded-lg border border-gray-700 relative overflow-hidden">
                <Skeleton className="h-8 w-48 mb-4 rounded" />
                <Skeleton className="h-4 w-full mb-6 rounded" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-start gap-3">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <div className="w-full">
                      <Skeleton className="h-4 w-32 mb-2 rounded" />
                      <Skeleton className="h-3 w-full rounded" />
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <div className="w-full">
                      <Skeleton className="h-4 w-32 mb-2 rounded" />
                      <Skeleton className="h-3 w-full rounded" />
                    </div>
                  </div>
                </div>
                <Skeleton className="h-10 w-40 rounded" />
              </div>
            ) : data?.isPro ? (
              <div className="bg-black p-6 rounded-lg border border-yellow-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-800 to-transparent opacity-10"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-yellow-400 flex items-center gap-2">
                        <IconStar />
                        Premium Membership
                      </h3>
                      <p className="text-gray-300">Your Premium membership is active</p>
                    </div>
                    <span className="text-amber-400 font-bold text-2xl">PRO</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="text-yellow-500 mt-1">
                        <IconZap />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Priority Support</h4>
                        <p className="text-gray-400 text-sm">Get faster responses to your inquiries</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-yellow-500 mt-1">
                        <IconStar />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Custom Profile</h4>
                        <p className="text-gray-400 text-sm">Unlock additional profile customization</p>
                      </div>
                    </div>
                  </div>

                  <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg flex items-center gap-2 transition-colors">
                    <IconCreditCard />
                    Manage Subscription
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-black p-6 rounded-lg border border-gray-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-transparent opacity-10"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-blue-400 flex items-center gap-2">
                        <IconStar />
                        Upgrade to Premium
                      </h3>
                      <p className="text-gray-300">Enhance your experience with premium features</p>
                    </div>
                    <span className="text-blue-400 font-bold text-2xl">PRO</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="text-blue-500 mt-1">
                        <IconZap />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Priority Support</h4>
                        <p className="text-gray-400 text-sm">Get faster responses to your inquiries</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-blue-500 mt-1">
                        <IconStar />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Custom Profile</h4>
                        <p className="text-gray-400 text-sm">Unlock additional profile customization</p>
                      </div>
                    </div>
                  </div>

                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center gap-2 transition-colors">
                    <IconArrowUp />
                    Upgrade Now
                  </button>
                </div>
              </div>
            )}

            {/* Profile Form */}
            <div className="bg-black p-6 rounded-lg border border-[#ffffff]">
              {isLoading ? (
                <div className="space-y-6">
                  <div>
                    <Skeleton className="h-6 w-48 mb-4 rounded" />
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Skeleton className="h-4 w-24 mb-2 rounded" />
                        <Skeleton className="h-10 w-full rounded" />
                      </div>
                      <div>
                        <Skeleton className="h-4 w-24 mb-2 rounded" />
                        <Skeleton className="h-10 w-full rounded" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Skeleton className="h-6 w-48 mb-4 rounded" />
                    <div>
                      <Skeleton className="h-4 w-32 mb-2 rounded" />
                      <Skeleton className="h-10 w-full rounded" />
                    </div>
                  </div>

                  <div>
                    <Skeleton className="h-6 w-48 mb-4 rounded" />
                    <div>
                      <Skeleton className="h-4 w-36 mb-2 rounded" />
                      <Skeleton className="h-10 w-full rounded" />
                    </div>
                  </div>

                  <div>
                    <Skeleton className="h-4 w-16 mb-2 rounded" />
                    <Skeleton className="h-24 w-full rounded" />
                  </div>
                </div>
              ) : (
                <>
                  {actionData?.errors?.general && (
                    <GeneralError error={actionData.errors.general} />
                  )}

                  {actionData?.errors?.password && (
                    <GeneralError error={actionData.errors.password} />
                  )}
                  <Form method='post' className="space-y-6">
                    {/* Personal Information */}
                    <input
                      type="text"
                      name="imgUrl"
                      value={imgUrl || ""}
                      onChange={handleChange}
                      className="hidden"
                    />

                    <div>
                      <h3 className="text-lg font-medium text-white mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                            Username
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                              <IconUser />
                            </div>
                            <input
                              type="text"
                              id="username"
                              name="username"
                              defaultValue={data?.username || ""}
                              onChange={handleChange}
                              className="pl-10 block w-full rounded-lg bg-black border-[#ffffff] text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2.5"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
                            Full Name
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                              <IconUser />
                            </div>
                            <input
                              type="text"
                              id="fullName"
                              name="fullName"
                              defaultValue={data?.fullName || ""}
                              onChange={handleChange}
                              className="pl-10 block w-full rounded-lg bg-black border-[#ffffff] text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2.5"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Password Section */}
                    <div>
                      <h3 className="text-lg font-medium text-white mb-4">Change Password</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-1">
                            Old Password
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                              <IconLock />
                            </div>
                            <input
                              type="password"
                              id="oldPassword"
                              name="oldPassword"
                              onChange={handleChange}
                              className="pl-10 block w-full rounded-lg bg-black border-[#ffffff] text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2.5"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-1">
                            New Password
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                              <IconLock />
                            </div>
                            <input
                              type="password"
                              id="newPassword"
                              name="newPassword"
                              onChange={handleChange}
                              className="pl-10 block w-full rounded-lg bg-black border-[#ffffff] text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2.5"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={data?.bio || ""}
                        onChange={handleChange}
                        rows={4}
                        className="block w-full rounded-lg bg-black border-[#ffffff] text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2.5"
                      />
                    </div>

                    {/* Submit button */}
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <IconSave />
                        {
                          isSubmitting ? "Saving..." : "Save Changes"
                        }
                      </button>
                    </div>

                  </Form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProfilePage;