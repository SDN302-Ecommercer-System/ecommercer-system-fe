import MainLayout from "../MainLayout";

const NotFound = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center">
        <img className="w-60 h-60" src="/img/404.png" alt="404" />
        <h3 className="text-3xl text-slate-600">This page not found</h3>
      </div>
    </MainLayout>
  );
};

export default NotFound;
