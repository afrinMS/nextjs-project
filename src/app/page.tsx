import UserList from "@/components/UserList";

const Home: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="container mx-auto p-4">
        <UserList />
      </div>
    </main>
  );
};

export default Home;
