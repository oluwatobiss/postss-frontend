"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { UserTokenNDataContext } from "@/app/_components/context/Contexts";
import { ChangeEvent, Errors, FormEvent } from "@/app/_types";
import useSWRMutation from "swr/mutation";
import mutateData from "../_mutateData";

export default function EditProfile() {
  const router = useRouter();
  const { userTokenNData, updateUserTokenNData } = useContext(
    UserTokenNDataContext
  );
  const { userToken, userData } = userTokenNData;
  const [firstName, setFirstName] = useState(userData.firstName || "");
  const [lastName, setLastName] = useState(userData.lastName || "");
  const [username, setUsername] = useState(userData.username);
  const [bio, setBio] = useState(userData.bio || "");
  const [email, setEmail] = useState(userData.email);
  const [website, setWebsite] = useState(userData.website || "");
  const [admin, setAdmin] = useState(userData.status === "ADMIN");
  const [adminCode, setAdminCode] = useState("");
  const [errors, setErrors] = useState<Errors[]>([]);
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/users`;
  const userId = userData.id;
  const { trigger, isMutating, error } = useSWRMutation(
    `${url}/${userId}`,
    mutateData
  );
  const { trigger: removeUser, isMutating: isDeleting } = useSWRMutation(
    url,
    mutateData
  );

  async function updateUser(e: FormEvent) {
    e.preventDefault();
    try {
      const result = await trigger({
        method: "PUT",
        firstName,
        lastName,
        username,
        bio,
        email,
        website,
        admin,
        adminCode,
        userToken,
      });
      if (result.errors?.length) return setErrors(result.errors);
      if (result.message) {
        alert("Error: Invalid edit credentials");
        throw new Error(result.message);
      }
      localStorage.setItem("postssUserData", JSON.stringify(result));
      updateUserTokenNData({ userToken, userData: result });
      router.push(`/profile/@${userData.username}`);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }

  function updateAdminCode(e: ChangeEvent) {
    errors.length && setErrors([]);
    setAdminCode(e.target.value);
  }

  function showErrorFor(field: string) {
    return errors.find((error) => error.path === field) ? (
      <div className="mb-2 text-sm text-red-500">
        {errors.find((error) => error.path === field)?.msg}
      </div>
    ) : (
      ""
    );
  }

  async function deleteAccount(id: number) {
    try {
      if (confirm("Delete your account permanently?")) {
        const result = await removeUser({ method: "DELETE", id, userToken });
        if (result.message) {
          alert("Error: Invalid delete credentials");
          throw new Error(result.message);
        }
        localStorage.removeItem("postssToken");
        localStorage.removeItem("postssUserData");
        router.push("/");
      }
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }

  return (
    <div className="px-[30%] py-20 not-md:px-[15%] min-h-screen font-[family-name:var(--font-geist-sans)]">
      <form
        className="[&_.text-input]:w-full [&_input]:border [&_input]:border-gray-500 [&_input]:rounded-sm [&_input]:my-1 [&_input]:px-5 [&_input]:py-2 [&_input]:text-lg [&_label]:inline-block [&_label]:text-sm [&_.text-input-label]:mt-3"
        onSubmit={updateUser}
      >
        <div>
          <label className="text-input-label" htmlFor="firstName">
            First name
          </label>
          <input
            className="text-input"
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {showErrorFor("firstName")}
        </div>
        <div>
          <label className="text-input-label" htmlFor="lastName">
            Last name
          </label>
          <input
            className="text-input"
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {showErrorFor("lastName")}
        </div>
        <div>
          <label className="text-input-label" htmlFor="username">
            Username
          </label>
          <input
            className="text-input"
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {showErrorFor("username")}
        </div>
        <div>
          <label className="text-input-label" htmlFor="bio">
            Bio
          </label>
          <input
            className="text-input"
            type="text"
            name="bio"
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          {showErrorFor("bio")}
        </div>
        <div>
          <label className="text-input-label" htmlFor="email">
            Email
          </label>
          <input
            className="text-input"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {showErrorFor("email")}
        </div>
        <div>
          <label className="text-input-label" htmlFor="website">
            Website
          </label>
          <input
            className="text-input"
            type="url"
            name="website"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          {showErrorFor("website")}
        </div>
        <div className="mt-3 flex items-center gap-3">
          <label htmlFor="adminCheckbox">Admin?</label>
          <input
            className="w-[initial]"
            type="checkbox"
            id="adminCheckbox"
            checked={admin}
            onChange={() => setAdmin(!admin)}
          />
        </div>
        {admin ? (
          <div>
            <label className="text-input-label" htmlFor="adminCode">
              Enter your passcode:
            </label>
            <input
              className="text-input"
              type="password"
              name="adminCode"
              id="adminCode"
              value={adminCode}
              onChange={updateAdminCode}
              required
            />
            {showErrorFor("adminCode")}
          </div>
        ) : (
          ""
        )}
        <button
          type="submit"
          disabled={isMutating}
          className="cursor-pointer rounded-lg border border-solid border-transparent transition-colors bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 mt-3 px-4 sm:px-5"
        >
          Update
        </button>
      </form>
      {!admin && (
        <>
          <hr className="my-5 text-gray-600" />
          <p className="text-sm text-red-500">Danger Zone</p>
          <button
            type="button"
            disabled={isDeleting}
            onClick={() => deleteAccount(userId)}
            className="cursor-pointer rounded-lg border border-solid border-transparent transition-colors bg-foreground text-background hover:bg-red-500 dark:hover:bg-red-500 font-medium text-sm sm:text-base h-10 sm:h-12 mt-3 px-4 sm:px-5"
          >
            Delete Account
          </button>
        </>
      )}
      {isMutating && (
        <div className="my-3 text-sm text-yellow-300">Updating profile...</div>
      )}
      {error && (
        <div className="my-3 text-sm text-red-500">Error: {error.message}</div>
      )}
    </div>
  );
}
