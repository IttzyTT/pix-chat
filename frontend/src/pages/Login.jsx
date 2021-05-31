import React, { useEffect, useState } from 'react'
import { useNamedContext } from 'react-easier';
import styled from 'styled-components';

 

export default function Login() {
    const globalStore = useNamedContext('global');
    const [loginCred, setLoginCred] = useState({
        name: '',
        password: ''
    });
    const [currentPage, setCurrentPage] = useState('login'); // 'login' eller 'createAccount'

    useEffect(() => {
        let currentUserId = localStorage.getItem('pixChatCurrentUserId');
        currentUserId ?
        globalStore.currentUserId = currentUserId :
        globalStore.currentUserId = '';
    },[]);

    const changeHandler = (e) => {
        setLoginCred({
            ...loginCred, 
            [e.target.name]: e.target.value
        })
    }

    let loginName, loginPassword;
    useEffect(() => {
        loginName       = loginCred.name;
        loginPassword   = loginCred.password;
    }, [loginCred]);

    const signInHandler = async (e) => {
        if (e) e.preventDefault();

        try {
            let res = await fetch(`${globalStore.apiUrl}/users/login/${loginName}/${loginPassword}`);
            let loginResponse = await res.json();

            if (loginResponse.isMatch) {
                loginResponse['_doc'].isLoggedIn = true; //kanske skippa isLoggedIn helt?
                globalStore.currentUserId = loginResponse['_doc']['_id'];
                localStorage.setItem('pixChatCurrentUserId', loginResponse['_doc']['_id']);
            } else {
                alert('darn it, wrong password or no account') ;
            }

        } catch (error) {
            console.log(error);
        }
    }

    // Create Account
    const createAccountHandler = async (e) => {
        if (e) e.preventDefault();

        try {
            await fetch(`${globalStore.apiUrl}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginCred)
            })
            console.log('account created');
            await signInHandler();
        } catch (error) {
            console.log(error);
        }
    }

    const whatPage = (e) => {
        e.preventDefault();
        if (currentPage === 'login') {
            signInHandler();
        } else if (currentPage === 'createAccount') {
            createAccountHandler();
        }
    }
    console.log(currentPage);
    return (
        <Flexwrapper>
            <Centering>
                <LogoDiv>
                    <svg width="217" height="176" viewBox="0 0 217 176" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="logo-upright">
                            <path id="logo" d="M108 0C138.929 0 164 25.0712 164 56C164 86.9288 138.929 112 108 112C77.0712 112 52 86.9288 52 56C52 25.0712 77.0712 0 108 0ZM113.774 34.1544H99.0792C93.5464 34.1544 89.0608 38.5 89.0608 43.8592V81.648L103.593 67.8104H113.774C123.366 67.8104 131.139 60.2784 131.139 50.9824C131.139 41.6864 123.366 34.1544 113.779 34.1544H113.774Z" fill="#6F6CFA"/>
                            <path id="text" d="M20.2439 136.07C22.9206 136.07 25.3406 136.693 27.5039 137.94C29.6672 139.187 31.3539 140.91 32.5639 143.11C33.8106 145.31 34.4339 147.822 34.4339 150.645C34.4339 153.468 33.8106 155.998 32.5639 158.235C31.3539 160.435 29.6672 162.158 27.5039 163.405C25.3406 164.615 22.9206 165.22 20.2439 165.22C17.7139 165.22 15.4222 164.633 13.3689 163.46C11.3156 162.25 9.72057 160.582 8.58391 158.455V175.67H5.83391V136.29H8.47391V143.055C9.61057 140.855 11.2056 139.15 13.2589 137.94C15.3489 136.693 17.6772 136.07 20.2439 136.07ZM20.0789 162.745C22.2789 162.745 24.2589 162.232 26.0189 161.205C27.7789 160.178 29.1539 158.748 30.1439 156.915C31.1706 155.082 31.6839 152.992 31.6839 150.645C31.6839 148.298 31.1706 146.208 30.1439 144.375C29.1539 142.542 27.7789 141.112 26.0189 140.085C24.2589 139.058 22.2789 138.545 20.0789 138.545C17.8789 138.545 15.8989 139.058 14.1389 140.085C12.4156 141.112 11.0406 142.542 10.0139 144.375C9.02391 146.208 8.52891 148.298 8.52891 150.645C8.52891 152.992 9.02391 155.082 10.0139 156.915C11.0406 158.748 12.4156 160.178 14.1389 161.205C15.8989 162.232 17.8789 162.745 20.0789 162.745ZM42.9482 136.29H45.6982V165H42.9482V136.29ZM44.3232 129.305C43.6998 129.305 43.1682 129.103 42.7282 128.7C42.2882 128.26 42.0682 127.728 42.0682 127.105C42.0682 126.482 42.2882 125.95 42.7282 125.51C43.1682 125.07 43.6998 124.85 44.3232 124.85C44.9465 124.85 45.4782 125.07 45.9182 125.51C46.3582 125.913 46.5782 126.427 46.5782 127.05C46.5782 127.673 46.3582 128.205 45.9182 128.645C45.4782 129.085 44.9465 129.305 44.3232 129.305ZM75.549 165L65.704 152.185L55.859 165H52.724L64.109 150.205L53.329 136.29H56.464L65.704 148.225L74.944 136.29H78.024L67.244 150.205L78.794 165H75.549ZM86.6895 124.19H89.2745V175.67H86.6895V124.19ZM113.2 165.22C110.414 165.22 107.92 164.597 105.72 163.35C103.52 162.103 101.797 160.38 100.55 158.18C99.3037 155.943 98.6804 153.432 98.6804 150.645C98.6804 147.822 99.3037 145.31 100.55 143.11C101.797 140.873 103.52 139.15 105.72 137.94C107.92 136.693 110.414 136.07 113.2 136.07C115.51 136.07 117.6 136.528 119.47 137.445C121.377 138.325 122.917 139.627 124.09 141.35L122.055 142.835C121.029 141.405 119.745 140.342 118.205 139.645C116.702 138.912 115.034 138.545 113.2 138.545C110.964 138.545 108.947 139.058 107.15 140.085C105.39 141.075 103.997 142.487 102.97 144.32C101.98 146.153 101.485 148.262 101.485 150.645C101.485 153.028 101.98 155.137 102.97 156.97C103.997 158.803 105.39 160.233 107.15 161.26C108.947 162.25 110.964 162.745 113.2 162.745C115.034 162.745 116.702 162.397 118.205 161.7C119.745 160.967 121.029 159.885 122.055 158.455L124.09 159.94C122.917 161.663 121.377 162.983 119.47 163.9C117.6 164.78 115.51 165.22 113.2 165.22ZM145.865 136.07C149.458 136.07 152.3 137.115 154.39 139.205C156.48 141.295 157.525 144.302 157.525 148.225V165H154.775V148.445C154.775 145.218 153.95 142.762 152.3 141.075C150.686 139.388 148.413 138.545 145.48 138.545C142.106 138.545 139.448 139.553 137.505 141.57C135.561 143.587 134.59 146.3 134.59 149.71V165H131.84V124.19H134.59V142.285C135.58 140.305 137.046 138.783 138.99 137.72C140.933 136.62 143.225 136.07 145.865 136.07ZM178.527 136.07C182.083 136.07 184.815 136.987 186.722 138.82C188.628 140.617 189.582 143.275 189.582 146.795V165H186.942V159.885C186.025 161.572 184.687 162.892 182.927 163.845C181.167 164.762 179.058 165.22 176.602 165.22C173.412 165.22 170.882 164.468 169.012 162.965C167.178 161.462 166.262 159.482 166.262 157.025C166.262 154.642 167.105 152.717 168.792 151.25C170.515 149.747 173.247 148.995 176.987 148.995H186.832V146.685C186.832 144.008 186.098 141.973 184.632 140.58C183.202 139.187 181.093 138.49 178.307 138.49C176.4 138.49 174.567 138.82 172.807 139.48C171.083 140.14 169.617 141.02 168.407 142.12L167.032 140.14C168.462 138.857 170.185 137.867 172.202 137.17C174.218 136.437 176.327 136.07 178.527 136.07ZM176.987 162.965C179.37 162.965 181.387 162.415 183.037 161.315C184.723 160.215 185.988 158.62 186.832 156.53V151.14H177.042C174.218 151.14 172.165 151.653 170.882 152.68C169.635 153.707 169.012 155.118 169.012 156.915C169.012 158.785 169.708 160.27 171.102 161.37C172.495 162.433 174.457 162.965 176.987 162.965ZM215.157 163.185C214.46 163.845 213.58 164.358 212.517 164.725C211.49 165.055 210.409 165.22 209.272 165.22C206.779 165.22 204.854 164.542 203.497 163.185C202.14 161.792 201.462 159.867 201.462 157.41V138.655H196.182V136.29H201.462V130.02H204.212V136.29H213.342V138.655H204.212V157.135C204.212 159.005 204.652 160.435 205.532 161.425C206.449 162.378 207.787 162.855 209.547 162.855C211.344 162.855 212.829 162.323 214.002 161.26L215.157 163.185Z" fill="#F3F2FF"/>
                        </g>
                    </svg>
                </LogoDiv>
                <FormContainer>
                    <form onSubmit={whatPage}>
                        <div className="input-field-container">
                            <i className="material-icons">person_outline</i>
                            <span>
                                <input value={loginCred.name} onChange={changeHandler} type="text" placeholder="Username" name="name" id="login-input-name" className="login-input-field" required />
                            </span>
                        </div>
                        <div className="input-field-container">
                            <i className="material-icons">lock</i>
                            <span>
                                <input value={loginCred.password} onChange={changeHandler} type="password" placeholder="Password" name="password" id="login-input-password" className="login-input-field" required />
                            </span>
                        </div>
                        <br />
                        <br />
                        <button 
                            type="submit" 
                            id="btn-sign-in" 
                            className="btn-round"
                            style={currentPage === 'login' ? 
                            {fontSize: '2.2rem'}
                            : 
                            {fontSize: '1.8rem'}
                            }
                        >
                            {currentPage === 'login' ? 'Sign In' : 'Create Account & Sign In'}
                        </button>
                    </form>
                </FormContainer>
                {currentPage === 'login' ?
                <CreateAccountContainer>
                        <p>New to pix|chat?</p>
                        <button id="btn-create-account" className="btn-round" onClick={() => setCurrentPage('createAccount')}>Create Account</button>
                </CreateAccountContainer>
                :
                null}
            </Centering>
        </Flexwrapper>
    )
}

const Flexwrapper = styled.div`
    background-color: #434343;
    position: relative;
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Centering = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    height: 100vh;
    .btn-round {
        border-radius: 50px;
        height: 3.7rem;
        color: #F3F3F3;
    }
    #btn-sign-in {
        background-color: #615DF8;
        border: 0;
        font-family: Roboto;
        font-style: normal;
        font-weight: 300;
        font-size: 2.2rem;
        width: 100%;
    }
    #btn-create-account {
        background-color: transparent;
        border: 1px solid #615DF8;
        font-family: Roboto;
        font-style: normal;
        font-weight: 300;
        font-size: 1.3rem;
        padding: 0 1.6rem;
        white-space: nowrap;
    }
`

const LogoDiv = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const FormContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    input[type=text], input[type=password] {
        box-sizing: border-box;
        border-bottom: 0;
        height: initial;
        margin: 0;
        padding: 1rem;
        background-color: transparent;
        color: #F3F3F3;
        font-size: 1.4rem;
        font-weight: 200;
    }
    .input-field-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        height: 3rem;
        margin-top: 1rem;
        border-bottom: 1px solid #9e9e9e
    }
    .input-field-container > span {
        flex-grow: 1;
    }
`

const CreateAccountContainer = styled.div`
    margin-bottom: 2vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 0;
`