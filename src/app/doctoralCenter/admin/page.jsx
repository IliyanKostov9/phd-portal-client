"use client";
import { mainListItems } from "@/components/app/doctoralCenter/admin/mainListItems";
import HomeDoctralCenterGrid from "@/components/main-layout/components/HomeDoctralCenterGrid";
import Layout from "@/components/main-layout/Layout";
import selectDoctoralCenter from "@/lib/features/doctoralCenter/slices/doctoralCenterMemoSelector";
import Log from "@/models/Log";
import { useSelector } from "react-redux";

export default function Page() {
  const doctoralCenter = useSelector(selectDoctoralCenter);
  const user = {
    name: doctoralCenter.name,
    email: doctoralCenter.email,
    picture: doctoralCenter.picture
  };

  Log.info("Admin has entered home page!", "Visit");

  return (
    <Layout
      headerTitle={"Начална страница"}
      user={user}
      MainView={HomeDoctralCenterGrid}
      mainListItems={mainListItems}
    />
  );
}
