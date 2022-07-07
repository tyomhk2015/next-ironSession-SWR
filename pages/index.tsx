import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";

export default () => {
  const router = useRouter();
  const { data, error } = useSWR("/api/profile");

  console.log(data);
  useEffect(() => {
    const isLoading = !data && !error;
    if (isLoading) return;
    if (data && data.error) {
      router.push("/create-account");
    }
  }, [data, router]);

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome {data?.ok && data?.id && data?.name}</p>
      {data?.ok && data?.id && (
        <>
          <p>
            <b>This is your profile.</b>
          </p>
          <p>{data?.ok && data?.id && Object.entries(data)}</p>
        </>
      )}
    </div>
  );
};
