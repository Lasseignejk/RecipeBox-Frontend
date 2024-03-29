import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
	const { user, isAuthenticated } = useAuth0();

	// console.log(user);
	return (
		isAuthenticated && (
			<article>
				{user?.picture && (
					<img
						src={user.picture}
						alt={user?.name}
						className="rounded-full"
					/>
				)}
				<h2>{user?.name}</h2>
			</article>
		)
	);
};

export default Profile;
