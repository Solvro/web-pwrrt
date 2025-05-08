import { getDictionary } from "../../../dictionaries";
import AdminPageClient from "./AdminPageClient";

interface PageProps {
  params: {
    lang: string;
  };
}

const AdminPage: React.FC<PageProps> = async (props) => {
  const parameters = await props.params;
  const language =
    parameters.lang === "pl" || parameters.lang === "en" ? parameters.lang : "en";
  const dict = await getDictionary(language);

  return <AdminPageClient dict={dict.admin} />;
};

export default AdminPage;
