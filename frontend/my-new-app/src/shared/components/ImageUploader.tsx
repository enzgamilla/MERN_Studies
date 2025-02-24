import React from "react";

interface Props {
  imageValue: string;
  setValue: (val: string | null) => void;
}

const ImageUploader = (props: Props) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        props.setValue(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    props.setValue(null);
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-400 rounded-sm cursor-pointer hover:border-gray-500 hover:bg-gray-50 transition-colors overflow-hidden">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        {props.imageValue ? (
          <img
            src={props.imageValue}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-600 text-sm">Upload Image</span>
        )}
      </label>

      {/* Remove Image Button */}
      {props.imageValue && (
        <button
          type="button"
          onClick={handleRemoveImage}
          className="px-2 py-1 text-sm bg-red-500 text-white rounded-sm hover:bg-red-600"
        >
          Remove Image
        </button>
      )}
    </div>
  );
};

export default ImageUploader;
