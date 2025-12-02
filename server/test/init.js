
const BaseURL = 'http://localhost:3000';

const initTest = async() => {
  const res=await fetch(BaseURL);
    const text=await res.text();
    console.log(text);
}

initTest();