import React from 'react'

function SignUp() {


    // Create Account
    const createAccountHandler = async () => {
        try {
            await fetch(`${globalStore.apiUrl}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginCred)
            })
            alert('account created');
            await signInHandler();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <button onClick={createAccountHandler} id="btn-create-account" className="btn-round">Create Account</button>
        </div>
    )
}

export default SignUp
