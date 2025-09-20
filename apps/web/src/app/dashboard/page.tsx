export default async function DashboardPage() {
  // const session = await authClient.getSession({
  // 	fetchOptions: {
  // 		headers: await headers(),
  // 	},
  // });

  // if (!session.data) {
  // 	redirect("/login");
  // }

  return (
    <div>
      <h1>Dashboard</h1>
      {/* <p>Welcome {session.data.user.name}</p>
      <Dashboard session={session.data} /> */}
    </div>
  );
}
