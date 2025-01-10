import { useSelector } from "react-redux";
import selectSessionToken from "../features/sessionToken/slices/sessionTokenMemoSelector";
import selectDoctoralCenter from "../features/doctoralCenter/slices/doctoralCenterMemoSelector";
const API_URL = "/api/logs";

export default function LogsAPI() {
  const sessionToken = useSelector(selectSessionToken);

  const saveLog = (log) => {
    const user = getUserByGroup(sessionToken.group);

    if (user != null) {
      console.log(`User name: ${user.name}`);

      log.setUser({
        oid: user.oid,
        name: user.name,
        email: user.email,
        group: sessionToken.group
      });

      console.log(`Sending log: ${JSON.stringify(log)}`);

      try {
        const response = fetch(API_URL, {
          method: "POST",
          headers: {
            Authorization: sessionToken.accessToken
          },
          body: JSON.stringify(log)
        });

        const result = response.json();
        console.log(`Log response: ${JSON.stringify(result)}`);
      } catch (exception) {
        console.error(`Server error when trying to log in ${exception}`);
      }
    }
  };

  const getUserByGroup = (group) => {
    switch (group) {
      case "doctoralCenter":
        const doctoralCenter = useSelector(selectDoctoralCenter);
        return doctoralCenter;
      default:
        console.error(`Such group doesn't exist: ${group}`);
        break;
    }
  };

  return {
    saveLog
  };
}
