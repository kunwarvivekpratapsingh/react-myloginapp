import React,{useState,useEffect,useRef} from "react";
import { faCheck,faTimes,faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Registr  = () =>{

const userRef = useRef();
const errRef = useRef();

// user State
const[user,setUser] = useState('');
// validation user state
const[validName,setValidName] = useState([Boolean]);
// Focusing on the field user state
const[userFocus,setUserFocus] = useState([Boolean]);

// create the same state for password
const [pwd, setPwd] = useState('');
const [validPwd, setValidPwd] = useState(false);
const [pwdFocus, setPwdFocus] = useState(false);

const [matchPwd, setMatchPwd] = useState('');
const [validMatch, setValidMatch] = useState(false);
const [matchFocus, setMatchFocus] = useState(false);

// state for possible error message  & Success Message
const [errMsg, setErrMsg] = useState('');
const [success, setSuccess] = useState(false);


// now we will use the useEffect hook to set the focus on the user name field and i have to do it only once when the dom load
useEffect( () =>{
        userRef.current.focus();
},[] )

// the next ref is on userName and it is to validate the userName
// in this the secondf argumnent of userEffect is [user] which meand anytime the state of the user is changed
// validation will take place
useEffect(  () =>{
    const result = USER_REGEX.test(user);
    console.log(user);
    console.log(result);
    setValidName(result);
},[user]);

// now use the useEffect for Password
useEffect( () => {
        const pwdMatch = PWD_REGEX.test(pwd);
        console.log(pwdMatch);
        console.log(pwd);
       // now check whether confirm pwd aland pwd match or not
       setValidPwd(pwdMatch);
       const match = pwd ===matchPwd;
       setValidMatch(match);
},[pwd,matchPwd] );

// now useEffect For Error Message 
useEffect( () =>{
    setErrMsg('');  
},[user,pwd,matchPwd] )

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Registration</h1>
            <form>
                <label htmlFor="username">
                    Username:
                    <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                </label>
                <input 
                    type="text"
                    id="username"
                    ref = {userRef}
                    autoComplete = "off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                 />
                 <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                </p>
                <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>
                <button disabled = {!validName || !validPwd || !validMatch ? true : false}>Sign UP</button>       
            </form>
            <p>
                        Already registered?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Sign In</a>
                        </span>
                    </p>
        </section>
    )
}
export default Registr;