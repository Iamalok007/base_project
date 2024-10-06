// Initialize the contract and provider
const contractAddress = "you address here";
const abi = 
    [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_email",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_age",
                    "type": "uint256"
                }
            ],
            "name": "createUser",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "deleteUser",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_email",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_age",
                    "type": "uint256"
                }
            ],
            "name": "updateUser",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "email",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "age",
                    "type": "uint256"
                }
            ],
            "name": "UserCreated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "UserDeleted",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "email",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "age",
                    "type": "uint256"
                }
            ],
            "name": "UserUpdated",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "getTotalUsers",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "getUser",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "email",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "age",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct UserManagement.User",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

let provider;
let signer;
let contract;

// On window load, set up the provider
window.onload = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      contract = new ethers.Contract(contractAddress, abi, signer);
      console.log("Connected to contract");
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  } else {
    console.error("Metamask is not installed");
  }
};

// Function to create a user
async function createUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;

  try {
    const tx = await contract.createUser(name, email, parseInt(age));
    await tx.wait();
    alert("User created successfully!");
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

// Function to get user details
async function getUser() {
  const userId = document.getElementById("getUserId").value;

  try {
    const user = await contract.getUser(userId);
    document.getElementById("userDetails").innerText =
      `ID: ${user.id}, Name: ${user.name}, Email: ${user.email}, Age: ${user.age}`;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}

// Function to update user details
async function updateUser() {
  const userId = document.getElementById("updateUserId").value;
  const name = document.getElementById("updateName").value;
  const email = document.getElementById("updateEmail").value;
  const age = document.getElementById("updateAge").value;

  try {
    const tx = await contract.updateUser(userId, name, email, parseInt(age));
    await tx.wait();
    alert("User updated successfully!");
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

// Function to delete a user
async function deleteUser() {
  const userId = document.getElementById("deleteUserId").value;

  try {
    const tx = await contract.deleteUser(userId);
    await tx.wait();
    alert("User deleted successfully!");
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

// Function to get total number of users
async function getTotalUsers() {
  try {
    const total = await contract.getTotalUsers();
    document.getElementById("totalUsers").innerText = `Total Users: ${total}`;
  } catch (error) {
    console.error("Error fetching total users:", error);
  }
}
