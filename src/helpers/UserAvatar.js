import { Avatar } from "@mantine/core";

const UserAvatar = ({ name, size = 50 }) => {
  const getInitials = (name) => {
    if (!name || name.trim().length === 0) return "U"; // Default if name is empty

    const words = name.trim().split(" ").filter(word => word.length > 0); // Remove extra spaces

    if (words.length === 1) {
      return words[0][0].toUpperCase(); // Only first letter if single word
    }

    return words[0][0].toUpperCase() + (words[1]?.[0]?.toUpperCase() || ""); // Handle undefined safely
  };

  return (
    <Avatar radius="xl" color="blue" size={size}>
      {getInitials(name)}
    </Avatar>
  );
};

export default UserAvatar;
