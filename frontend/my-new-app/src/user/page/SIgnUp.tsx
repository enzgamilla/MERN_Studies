import React, { useState } from "react";
import Input from "../../shared/elements/Input";
import Link from "../../shared/elements/Link";
import ImageUploader from "../../shared/components/ImageUploader";

const SignUp = () => {
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [re_password, setRe_Password] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [validation, setValidation] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Reset validation message
    setValidation("");

    // Validate fields
    if (!image) {
      setValidation("Please upload your image.");
      return;
    }
    if (!username || !name || !password || !re_password || !image) {
      setValidation("All fields are required.");
      return;
    }
    if (password !== re_password) {
      setValidation("Your password does not match.");
      return;
    }

    // Log the form data if all validations pass
    console.log({
      username,
      name,
      password,
      image,
    });

    // Optionally, you can reset the form fields after submission
    setUsername("");
    setName("");
    setPassword("");
    setRe_Password("");
    setImage(null);
  };

  return (
    <div className="shadow-lg space-y-5 h-auto p-5 m-5 bg-white rounded-lg border border-gray-300 lg:w-2xl md:w-2xl">
      <form
        className="flex flex-col space-y-5 text-sm md:flex-row md:space-x-5 md:space-y-0"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col space-y-3 flex-1">
          <Input
            type="text"
            title="Username"
            setValue={setUsername}
            value={username}
          />
          <Input type="text" title="Fullname" setValue={setName} value={name} />
          <Input
            type="password"
            title="Password"
            setValue={setPassword}
            value={password}
          />
          <Input
            type="password"
            title="Re-enter Password"
            setValue={setRe_Password}
            value={re_password}
          />
        </div>
        <div className="flex flex-col space-y-5 flex-1 items-center">
          <ImageUploader imageValue={image!} setValue={setImage} />
          <button
            type="submit"
            className="w-fit px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 md:w-auto hover:cursor-pointer"
          >
            Create account
          </button>
        </div>
      </form>
      <div className="flex flex-col items-center space-y-2">
        <Link location="/signin" label="Back to Login" newTab={false} />
        {validation && (
          <span className="text-xs text-red-600">{validation}</span>
        )}
      </div>
    </div>
  );
};

export default SignUp;
