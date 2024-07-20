import { useState } from "react";

type FormData = {
  fullname: string;
  email: string;
  message: string;
  phone: string;
  service: string;
};

type ApiResponse<T> = {
  data: T | null;
  loading: boolean;
  error: any;
};

type UseMailprexProps = {
  url: string;
  webName: string;
  emailDestiny: string;
  formToken: string;
};

const useMailprex = ({
  url,
  webName,
  emailDestiny,
  formToken,
}: UseMailprexProps) => {
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    email: "",
    message: "",
    phone: "",
    service: "",
  });

  const [response, setResponse] = useState<ApiResponse<any>>({
    data: null,
    loading: false,
    error: null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setResponse({ data: null, loading: true, error: null });
      const options: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, webName, emailDestiny, formToken }),
      };
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setResponse({ data, loading: false, error: null });
    } catch (error) {
      setResponse({ data: null, loading: false, error });
    }
  };

  return { formData, handleChange, handleSubmit, response };
};

export default useMailprex;
