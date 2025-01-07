"use client";
import { useAppDispatch } from "@/lib/features/constants";
import { useEffect } from "react";
import { setSessionToken } from "@/lib/features/sessionToken/slices/sessionTokenSlice";
import { useRouter } from "next/navigation";
import { setPhd } from "@/lib/features/phd/slices/phdSlice";
import { setDoctoralCenter } from "@/lib/features/doctoralCenter/slices/doctoralCenterSlice";
import { setCommittee } from "@/lib/features/committee/slices/committeeSlice";
import Auth from "@/lib/auth/auth";
import UnauthorizedAPI from "@/lib/api/unautharized";

export default function AuthHook() {
  const { handleLogin } = Auth();
  const dispatch = useAppDispatch();
  const { fetchLogin } = UnauthorizedAPI();
  const router = useRouter();

  const evaluateRole = (data, role) => {
    switch (role) {
      case "doctoralCenter":
        dispatch(setDoctoralCenter({ data }));
        break;
      case "phd":
        dispatch(setPhd({ data }));
        break;
      case "committee":
        dispatch(setCommittee({ data }));
        break;
      default:
        console.error(`Invalid role ${role}`);
    }
  };

  useEffect(() => {
    const handleAuth = async () => {
      const response = await handleLogin();

      if (response) {
        const userCreds = {
          oid: response.idTokenClaims.oid,
          name: response.idTokenClaims.name,
          email: response.idTokenClaims.email,
          timestamp: Date.now()
        };
        const accessToken = response.accessToken;
        dispatch(setSessionToken({ accessToken }));

        const loginResponse = await fetchLogin(userCreds, accessToken);
        // TODO: Improve this checking
        if ("group" in loginResponse) {
          evaluateRole(loginResponse.data, loginResponse.group);
          router.push("/" + loginResponse.group);
        } else router.push(loginResponse);
      }
    };

    handleAuth();
  }, [dispatch]);
}
