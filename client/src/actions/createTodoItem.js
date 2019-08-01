export default async ({ content, deadline }) => {
  const nonJsonResponse = await fetch("/api/todos/createItem", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ content, deadline: deadline.toISOString() })
  });
  const response = await nonJsonResponse.json();
  return response;
};
