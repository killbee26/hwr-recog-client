"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

const DashboardPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [responseText, setResponseText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    } else {
      setImagePreview(null);
    }
  };

  const handleImageUpload = async () => {
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("description", description);

    try {
      setIsLoading(true);
      // Post the image and description to the backend
      const { data } = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Assuming the API returns the extracted text from Google Vision API
      setResponseText(data.extractedText);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-6 justify-between px-6 py-8">
      {/* Card 1: Form to upload image */}
      <Card className="w-full lg:w-1/3">
        <CardHeader>
          <CardTitle>Upload Image</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="image" className="block">
                <span className="text-sm font-medium">Image File</span>
                {/* Hide the default input and use a styled label */}
                <label
                  htmlFor="image"
                  className={`mt-2 cursor-pointer bg-black text-white px-4 py-2 rounded-md inline-block `}
                >
                  {image ? image.name : "Choose File"}
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                 // Disable input once an image is selected
                />
              </label>
            </div>
            <div className="grid gap-2">
              <label htmlFor="description" className="block">
                <span className="text-sm font-medium">Description</span>
                <Textarea
                  id="description"
                  placeholder="Enter image description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
            </div>
            <Button onClick={handleImageUpload} disabled={isLoading}>
              {isLoading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Display response from Google Vision API */}
      <Card className="w-full lg:w-1/2">
        <CardHeader>
          <CardTitle>Extracted Text</CardTitle>
        </CardHeader>
        <CardContent>
          {responseText ? (
            <p>{responseText}</p>
          ) : (
            <p className="text-muted-foreground">
              The extracted text will appear here after uploading an image.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Card 3: Image Preview */}
      <Card className="w-full lg:w-1/3">
        <CardHeader>
          <CardTitle>Image Preview</CardTitle>
        </CardHeader>
        <CardContent>
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-64 w-full object-contain"
            />
          ) : (
            <p className="text-muted-foreground">
              No image selected for preview.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
