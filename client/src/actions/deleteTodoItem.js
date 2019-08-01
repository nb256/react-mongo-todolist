export default async ({ _id }) => {
  const nonJsonResponse = await fetch("/api/todos/deleteItem", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ _id })
  });
  const response = await nonJsonResponse.json();
  return response;
};
