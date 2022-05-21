"use strict";
exports.id = 18;
exports.ids = [18];
exports.modules = {

/***/ 18:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "aC": () => (/* binding */ useAuth),
/* harmony export */   "ZP": () => (/* binding */ AuthProvider)
/* harmony export */ });
/* unused harmony export AuthContext */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _onflow_fcl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(820);
/* harmony import */ var _onflow_fcl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_onflow_fcl__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _TransactionContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(63);




const AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_2__.createContext)({
});
const useAuth = ()=>(0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(AuthContext)
;
function AuthProvider({ children  }) {
    const { initTransactionState , setTxId , setTransactionStatus  } = (0,_TransactionContext__WEBPACK_IMPORTED_MODULE_3__/* .useTransaction */ .kF)();
    const { 0: currentUser , 1: setUser  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)({
        loggedIn: false,
        addr: undefined
    });
    const { 0: userProfile , 1: setProfile  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
    const { 0: profileExists , 1: setProfileExists  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>_onflow_fcl__WEBPACK_IMPORTED_MODULE_1__.currentUser.subscribe(setUser)
    , []);
    const loadProfile = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(async ()=>{
        const profile = await _onflow_fcl__WEBPACK_IMPORTED_MODULE_1__.query({
            cadence: `
        import Profile from 0xProfile

        pub fun main(address: Address): Profile.ReadOnly? {
          return Profile.read(address)
        }
      `,
            args: (arg, t)=>[
                    arg(currentUser.addr, t.Address)
                ]
        });
        setProfile(profile ?? null);
        setProfileExists(profile !== null);
        return profile;
    }, [
        currentUser,
        setProfile,
        setProfileExists
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        // Upon login check if a userProfile exists
        if (currentUser.loggedIn && userProfile === null) {
            loadProfile();
        }
    }, [
        currentUser,
        userProfile,
        loadProfile
    ]);
    const logOut = async ()=>{
        await _onflow_fcl__WEBPACK_IMPORTED_MODULE_1__.unauthenticate();
        setUser({
            addr: undefined,
            loggedIn: false
        });
        setProfile(null);
        setProfileExists(false);
    };
    const logIn = ()=>{
        _onflow_fcl__WEBPACK_IMPORTED_MODULE_1__.logIn();
    };
    const signUp = ()=>{
        _onflow_fcl__WEBPACK_IMPORTED_MODULE_1__.signUp();
    };
    const createProfile = async ()=>{
        initTransactionState();
        const transactionId = await _onflow_fcl__WEBPACK_IMPORTED_MODULE_1__.mutate({
            cadence: `
        import Profile from 0xProfile

        transaction {
          prepare(account: AuthAccount) {
            // Only initialize the account if it hasn't already been initialized
            if (!Profile.check(account.address)) {
              // This creates and stores the profile in the user's account
              account.save(<- Profile.new(), to: Profile.privatePath)

              // This creates the public capability that lets applications read the profile's info
              account.link<&Profile.Base{Profile.Public}>(Profile.publicPath, target: Profile.privatePath)
            }
          }
        }
      `,
            payer: _onflow_fcl__WEBPACK_IMPORTED_MODULE_1__.authz,
            proposer: _onflow_fcl__WEBPACK_IMPORTED_MODULE_1__.authz,
            authorizations: [
                _onflow_fcl__WEBPACK_IMPORTED_MODULE_1__.authz
            ],
            limit: 50
        });
        setTxId(transactionId);
        _onflow_fcl__WEBPACK_IMPORTED_MODULE_1__.tx(transactionId).subscribe((res)=>{
            setTransactionStatus(res.status);
            if (res.status === 4) {
                loadProfile();
            }
        });
    };
    const updateProfile = async ({ name , color , info  })=>{
        console.log("Updating profile", {
            name,
            color,
            info
        });
        initTransactionState();
        const transactionId = await _onflow_fcl__WEBPACK_IMPORTED_MODULE_1__.mutate({
            cadence: `
        import Profile from 0xProfile

        transaction(name: String, color: String, info: String) {
          prepare(account: AuthAccount) {
            account
              .borrow<&Profile.Base{Profile.Owner}>(from: Profile.privatePath)!
              .setName(name)

            account
              .borrow<&Profile.Base{Profile.Owner}>(from: Profile.privatePath)!
              .setInfo(info)

            account
              .borrow<&Profile.Base{Profile.Owner}>(from: Profile.privatePath)!
              .setColor(color)
          }
        }
      `,
            args: (arg, t)=>[
                    arg(name, t.String),
                    arg(color, t.String),
                    arg(info, t.String), 
                ]
            ,
            payer: _onflow_fcl__WEBPACK_IMPORTED_MODULE_1__.authz,
            proposer: _onflow_fcl__WEBPACK_IMPORTED_MODULE_1__.authz,
            authorizations: [
                _onflow_fcl__WEBPACK_IMPORTED_MODULE_1__.authz
            ],
            limit: 50
        });
        setTxId(transactionId);
        _onflow_fcl__WEBPACK_IMPORTED_MODULE_1__.tx(transactionId).subscribe((res)=>{
            setTransactionStatus(res.status);
            if (res.status === 4) {
                loadProfile();
            }
        });
    };
    const value = {
        currentUser,
        userProfile,
        profileExists,
        logOut,
        logIn,
        signUp,
        loadProfile,
        createProfile,
        updateProfile
    };
    console.log("AuthProvider", value);
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AuthContext.Provider, {
        value: value,
        children: children
    }));
};


/***/ }),

/***/ 63:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "kF": () => (/* binding */ useTransaction),
/* harmony export */   "ZP": () => (/* binding */ TransactionProvider)
/* harmony export */ });
/* unused harmony export TransactionContext */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


// https://docs.onflow.org/fcl/reference/api/#transaction-statuses
/**
 * STATUS CODE  DESCRIPTION <br/>
 * -1 No Active Transaction<br/>
 * 0  Unknown<br/>
 * 1  Transaction Pending - Awaiting Finalization<br/>
 * 2  Transaction Finalized - Awaiting Execution<br/>
 * 3  Transaction Executed - Awaiting Sealing<br/>
 * 4  Transaction Sealed - Transaction Complete. At this point the transaction result has been committed to the blockchain.<br/>
 * 5  Transaction Expired<br/>
 */ const TransactionContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
});
const useTransaction = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(TransactionContext)
;
function TransactionProvider({ children  }) {
    const { 0: transactionInProgress , 1: setTransactionInProgress  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: transactionStatus , 1: setTransactionStatus  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(-1);
    const { 0: txId , 1: setTxId  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    function initTransactionState() {
        setTransactionInProgress(true);
        setTransactionStatus(-1);
    }
    const value = {
        transactionInProgress,
        transactionStatus,
        txId,
        initTransactionState,
        setTxId,
        setTransactionStatus
    };
    console.log("TransactionProvider", value);
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(TransactionContext.Provider, {
        value: value,
        children: children
    }));
};


/***/ })

};
;