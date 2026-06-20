// a.js
async function hello() {
  try {
    // UPDATED DOMAIN PATH
    const response = await fetch('https://haloapi-nine.vercel.app/api/user');

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Server Error (${response.status}):`, errorText);
      return;
    }

    const data = await response.json();
    console.log("✅ Success! Received Data:", data);

  } catch (error) {
    console.error("❌ Network or Fetch Error:", error.message);
  }
}

hello();