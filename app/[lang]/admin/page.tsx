import { getDictionary } from '../../../dictionaries';
import AdminPageClient from './AdminPageClient';

interface PageProps {
  params: {
    lang: string;
  };
}

const AdminPage: React.FC<PageProps> = async props => {
  const params = await props.params;
  const language =
    params.lang === 'pl' || params.lang === 'en' ? params.lang : 'en';
  const dict = await getDictionary(language);

  return <AdminPageClient dict={dict.admin} />;
};

export default AdminPage;
