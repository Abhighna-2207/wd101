let loginform = document.getElementById("loginform");
const dobint = document.getElementById('dob');

dobint.addEventListener('input', (event) => {
    const dob = new Date(event.target.value);
    const now = new Date();
    const age = now.getFullYear() - dob.getFullYear();

    if (age < 18 || age > 55) {
        dobint.setCustomValidity('Enter a valid date of birth between ages 18 and 55.');
    }
    else{
        dobint.setCustomValidity('');
    }
});

const get_details = ()=>{
    let detail = localStorage.getItem("user_details");
    if(detail){
        detail = JSON.parse(detail);
    }
    else{
        detail = [];
    } 
    return detail;
}
let data = get_details();

const showdetails =()=>{
    const detail = get_details();
    const tableentries = detail.map((entry)=>{
        const nameCell = `<td>${entry.name}</td>`;
        const emailCell = `<td>${entry.email}</td>`;
        const passwordCell = `<td>${entry.pass}</td>`;
        const dobCell = `<td>${entry.dob}</td>`;
        const acceptTermsCell = `<td>${entry.ch}</td>`;
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const tab = 
    `<table class="table-auto w-full">
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>dob</th>
            <th>accepted terms?</th>
        </tr>${tableentries}
    </table>`;

    let f_details = document.getElementById("user_details");
    f_details.innerHTML = tab;
}
const saveform = (event)=>{
    event.preventDefault();
    const name = document.getElementById("name").value; 
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const ch = document.getElementById("acceptTerms").checked;
    const entry = {
        name,
        email,
        pass,
        dob,
        ch
    }
    data.push(entry);
    localStorage.setItem("user_details",JSON.stringify(data));
    showdetails();
}

loginform.addEventListener("submit",saveform); 

showdetails();