import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const [user, setUser] = useState(null)
  const [amountDW, setAmountDW] = useState("")     
  const [amountTR, setAmountTR] = useState("")      
  const [toAccount, setToAccount] = useState("")
  const [beneficiaries, setBeneficiaries] = useState([])

  const token = localStorage.getItem("token")


  useEffect(() => {
    async function fetchData() {
      try {
        const profile = await axios.get(
          "http://localhost:5000/api/bank/profile",
          { headers: { Authorization: "Bearer " + token } }
        )

        setUser(profile.data.user)

        const ben = await axios.get(
          "http://localhost:5000/api/bank/beneficiaries",
          { headers: { Authorization: "Bearer " + token } }
        )

        setBeneficiaries(ben.data.beneficiaries)

      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])



  
  async function deposit() {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/bank/deposit",
        { amount: amountDW },
        { headers: { Authorization: "Bearer " + token } }
      )

    
      const updated = {
        name: user.name,
        email: user.email,
        accountNumber: user.accountNumber,
        balance: res.data.balance
      }

      setUser(updated)
      setAmountDW("")  

    } catch (err) {
      console.log("Deposit failed....")
    }
  }



  async function withdraw() {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/bank/withdraw",
        { amount: amountDW },
        { headers: { Authorization: "Bearer " + token } }
      )

      const updated = {
        name: user.name,
        email: user.email,
        accountNumber: user.accountNumber,
        balance: res.data.balance
      }

      setUser(updated)
      setAmountDW("")

    } catch (err) {
      console.log("Withdraw failed...")
    }
  }



  
  async function transfer() {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/bank/transfer",
        { toAccount: toAccount, amount: amountTR },
        { headers: { Authorization: "Bearer " + token } }
      )

      const updated = {
        name: user.name,
        email: user.email,
        accountNumber: user.accountNumber,
        balance: res.data.balance
      }

      setUser(updated)

      setAmountTR("")     
      setToAccount("")    

    } catch (err) {
      console.log("Transfer Failed...")
    }
  }



  return (
    <>
      <div className="dashboard">
        
        <h2>Welcome, {user?.name}</h2>
        <p><b>Account: </b>{user?.accountNumber}</p>
        <p><b>Balance: </b>{user?.balance}</p>


        
        <div className="actions">
          <h3>Deposit / Withdraw</h3>

          <input
            type="number"
            placeholder="Enter amount"
            value={amountDW}
            onChange={(e) => setAmountDW(e.target.value)}
          />

          <button onClick={deposit}>Deposit</button>
          <button onClick={withdraw}>Withdraw</button>
        </div>



        
        <div className="actions">
          <h3>Transfer</h3>

          <select
            value={toAccount}
            onChange={(e) => setToAccount(e.target.value)}
          >
            <option value="">Select Beneficiary</option>

            {beneficiaries.map((x) => (
              <option key={x.accountNumber} value={x.accountNumber}>
                {x.name} - {x.accountNumber}
              </option>
            ))}
          </select>


          <input
            type="number"
            placeholder="Enter Amount"
            value={amountTR}
            onChange={(e) => setAmountTR(e.target.value)}
          />


          <button onClick={transfer}>Transfer</button>
        </div>

      </div>
    </>
  )
}

export default Dashboard
