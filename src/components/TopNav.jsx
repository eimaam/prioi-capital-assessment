import React, { useState } from 'react'
import { FaBars, FaEthereum, FaSearch } from 'react-icons/fa'
import ethLogo from "../assets/EthereumLogo.svg"
import { useData } from '../context/DataContext'
import { BiHome } from 'react-icons/bi'
import { FaSearchDollar } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { IoMdImages } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export const TopNav = () => {
    // importing walletAddress value and state updater to update as address is entered in search bar 
    const { setWalletAddress, walletAddress } = useData()

    // manage mobile navigation menu display ==> hide/show
    const [showNav, setShowNav] = useState(false)

    // function to manage items display on mobile when search is enabled
    const show = () => {
        const input = document.querySelector("input")
        const searchBtn = document.querySelector("#searchBtn")
        const cancelBtn = document.querySelector("#cancelBtn")
        const searchIcon = document.querySelector("#search")
        const title = document.querySelector("h3")
        const walletConnect = document.querySelector("#walletConnect")

        if(input.style.display !== "block"){
            input.style.display = "block"
            searchBtn.style.display = "block"
            cancelBtn.style.display = "block"
            searchIcon.style.display = "none"
            title.style.display = "none"
            walletConnect.style.display = "none"
        }else{
            input.style.display = "none"
            searchBtn.style.display = "none"
            cancelBtn.style.display = "none"
            searchIcon.style.display = "block"
            title.style.display = "block"
            walletConnect.style.display = "block"
        }
    }
    

    // user's entered address
    const [enteredAddress, setEnteredAddress] = useState("")
    

    const handleChange = (e) => {
        e.preventDefault()
        // const {name, value} = e.target
        setEnteredAddress(e.target.value)
        console.log(enteredAddress)
    }

    const fetchData = () => {
        setWalletAddress(enteredAddress)
    }

    

  return (
    <div className='top--nav' id='topNav'>
        <div className='nav--item'>
            <div className='flex-row'>
                <div id='navToggler'>
                    {!showNav && 
                    <h2 className='flex-row'>
                        <FaBars onClick={() => setShowNav(prev => !prev)} />
                    </h2>
                    }
                    {showNav && 
                    <h2>
                        <GrClose onClick={() => setShowNav(prev => !prev)} />
                    </h2>
                    }
                </div>
                <img src={ethLogo} alt="" />
                <h3>ETH-SCAN</h3>
            </div>
            <div className='flex-row'>
                <div className='flex-row'>
                    <input 
                    type="text" 
                    placeholder={walletAddress !== "0x690b9a9e9aa1c9db991c7721a92d351db4fac990" ? walletAddress : `enter ETH address`}
                    name='walletAddress'
                    onChange={handleChange}
                    />
                    <button type='submit' id='searchBtn' onClick={fetchData}>Search</button>
                    <button type='submit' id='cancelBtn' onClick={show}>Cancel</button>
                    <h2 id='searchIcon' onClick={show}><FaSearch /></h2>
                </div>
                <div id='walletConnect'>
                    <button className='flex-row' style={{gap: "0.2rem"}}>
                        <FaEthereum /> CONNECT WALLET 
                    </button>
                </div>
            </div>
        </div>
        {showNav &&
        <ul id='mNav'>
            <li>
                <Link to="/">
                    <BiHome /> Home
                </Link>
            </li>
            <li>
                <Link to="/">
                    <RiMoneyDollarCircleFill /> Assets
                </Link>
            </li>
            <li>
                <Link to="/">
                    <FaSearchDollar /> Explore
                </Link>
            </li>
            <li>
                <Link to="/">
                    <IoMdImages /> NFTs
                </Link>
            </li>
        </ul>
        }
    </div>
  )
}
