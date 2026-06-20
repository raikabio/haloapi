
async function hello() {
    const response = await fetch('http://localhost:5000/api/user');
    const data = await response.json();
    console.log(data);
}

hello();