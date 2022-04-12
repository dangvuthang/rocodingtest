
import * as React from "react";
import ExamCard from "../components/dashboard/ExamCard";
import Link from "next/link";
import AddExam from "../components/dashboard/AddExam";
import CreatedTests from "../components/interfaces/CreatedTests";
import EditExam from "../components/dashboard/EditExam";
import { getRequest } from "../util/axiosInstance";
import { useEffect } from "react";
import Header from "../components/layout/Header";
import { Typography } from "@mui/material";

export default function Dashboard() {

    function Copyright(props: any) {
        return (
            <footer className="w-full h-20 static bottom-0 mt-4 flex justify-center items-center">
                <Typography variant="body2" color="text.secondary" align="center" {...props}>
                    {'Copyright © '}
                    <Link color="inherit" href="https://mui.com/">
                        Your Website
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </footer>
        );
    }


    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="h-full flex">
                {/* SideBar */}
                <aside className="w-64" aria-label="Sidebar">
                    <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-full">
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                    <span className="ml-3">Exam List</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Student</span>
                                    {/* <span className="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span> */}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
                                    <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">3</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Sign In</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd"></path></svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>

                {/* Content */}
                <div className="w-full">
                    <div className="h-20 grid grid-cols-4 content-center justify-items-center border-l border-b border-black">
                        <div>
                            <button className="ml-5 px-4 py-2 text-white rounded-md border-solid border bg-blue-400">
                                Add Exam
                            </button>
                        </div>
                        <div>
                            <button className="ml-5 px-4 py-2 text-white rounded-md border-solid border bg-blue-400">
                                Delete Button
                            </button>
                        </div>
                        <div>
                            <button className="ml-5 px-4 py-2 text-white rounded-md border-solid border bg-blue-400">
                                Add Exam
                            </button>
                        </div>
                        <div>
                            <button className="ml-5 px-4 py-2 text-white rounded-md border-solid border bg-blue-400">
                                Add Exam
                            </button>
                        </div>
                    </div>
                    {/* Exam area */}
                    <div className="h-full">
                        {/* Exam box */}
                        <div className="mt-4 ml-4 mr-4 h-32  border border-black flex gap-3 items-center">
                            <div className="w-10">
                                <input className="ml-2" type="checkbox" />
                            </div>
                            <div className="">
                                <img src="https://picsum.photos/200/120" />
                            </div>
                            {/* Exam details */}
                            <div className="grid justify-between items-center h-full w-4/6">
                                <div>
                                    <h2 className="text-3xl">Test</h2>
                                </div>
                                <div>
                                    Default
                                </div>
                                <div>
                                    System Admin
                                </div>
                            </div>
                            {/* Button Edit and Delete */}
                            <div className="flex mr-4 content-center justify-end gap-2 w-2/6">
                                <div>
                                    <button className="px-4 py-2 text-white rounded-md border-solid border bg-blue-400 ml-5">Edit</button>
                                </div>
                                <div>
                                    <button className="px-4 py-2 text-white rounded-md border-solid border bg-blue-400 ml-5">Delete</button>
                                </div>
                            </div>
                        </div>



                        {/* Example */}
                        <div className="mt-4 ml-4 mr-4 h-32  border border-black flex gap-3 items-center">
                            <div className="w-10">
                                <input className="ml-2" type="checkbox" />
                            </div>
                            <div className="">
                                <img src="https://picsum.photos/200/120" />
                            </div>
                            {/* Exam details */}
                            <div className="grid justify-between items-center h-full w-4/6">
                                <div>
                                    <h2 className="text-3xl">Test</h2>
                                </div>
                                <div>
                                    Default
                                </div>
                                <div>
                                    System Admin
                                </div>
                            </div>
                            {/* Button Edit and Delete */}
                            <div className="flex mr-4 content-center justify-end gap-2 w-2/6">
                                <div>
                                    <button className="px-4 py-2 text-white rounded-md border-solid border bg-blue-400 ml-5">Edit</button>
                                </div>
                                <div>
                                    <button className="px-4 py-2 text-white rounded-md border-solid border bg-blue-400 ml-5">Delete</button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 ml-4 mr-4 h-32  border border-black flex gap-3 items-center">
                            <div className="w-10">
                                <input className="ml-2" type="checkbox" />
                            </div>
                            <div className="">
                                <img src="https://picsum.photos/200/120" />
                            </div>
                            {/* Exam details */}
                            <div className="grid justify-between items-center h-full w-4/6">
                                <div>
                                    <h2 className="text-3xl">Test</h2>
                                </div>
                                <div>
                                    Default
                                </div>
                                <div>
                                    System Admin
                                </div>
                            </div>
                            {/* Button Edit and Delete */}
                            <div className="flex mr-4 content-center justify-end gap-2 w-2/6">
                                <div>
                                    <button className="px-4 py-2 text-white rounded-md border-solid border bg-blue-400 ml-5">Edit</button>
                                </div>
                                <div>
                                    <button className="px-4 py-2 text-white rounded-md border-solid border bg-blue-400 ml-5">Delete</button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 ml-4 mr-4 h-32  border border-black flex gap-3 items-center">
                            <div className="w-10">
                                <input className="ml-2" type="checkbox" />
                            </div>
                            <div className="">
                                <img src="https://picsum.photos/200/120" />
                            </div>
                            {/* Exam details */}
                            <div className="grid justify-between items-center h-full w-4/6">
                                <div>
                                    <h2 className="text-3xl">Test</h2>
                                </div>
                                <div>
                                    Default
                                </div>
                                <div>
                                    System Admin
                                </div>
                            </div>
                            {/* Button Edit and Delete */}
                            <div className="flex mr-4 content-center justify-end gap-2 w-2/6">
                                <div>
                                    <button className="px-4 py-2 text-white rounded-md border-solid border bg-blue-400 ml-5">Edit</button>
                                </div>
                                <div>
                                    <button className="px-4 py-2 text-white rounded-md border-solid border bg-blue-400 ml-5">Delete</button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 ml-4 mr-4 h-32  border border-black flex gap-3 items-center">
                            <div className="w-10">
                                <input className="ml-2" type="checkbox" />
                            </div>
                            <div className="">
                                <img src="https://picsum.photos/200/120" />
                            </div>
                            {/* Exam details */}
                            <div className="grid justify-between items-center h-full w-4/6">
                                <div>
                                    <h2 className="text-3xl">Test</h2>
                                </div>
                                <div>
                                    Default
                                </div>
                                <div>
                                    System Admin
                                </div>
                            </div>
                            {/* Button Edit and Delete */}
                            <div className="flex mr-4 content-center justify-end gap-2 w-2/6">
                                <div>
                                    <button className="px-4 py-2 text-white rounded-md border-solid border bg-blue-400 ml-5">Edit</button>
                                </div>
                                <div>
                                    <button className="px-4 py-2 text-white rounded-md border-solid border bg-blue-400 ml-5">Delete</button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 ml-4 mr-4 h-32  border border-black flex gap-3 items-center">
                            <div className="w-10">
                                <input className="ml-2" type="checkbox" />
                            </div>
                            <div className="">
                                <img src="https://picsum.photos/200/120" />
                            </div>
                            {/* Exam details */}
                            <div className="grid justify-between items-center h-full w-4/6">
                                <div>
                                    <h2 className="text-3xl">Test</h2>
                                </div>
                                <div>
                                    Default
                                </div>
                                <div>
                                    System Admin
                                </div>
                            </div>
                            {/* Button Edit and Delete */}
                            <div className="flex mr-4 content-center justify-end gap-2 w-2/6">
                                <div>
                                    <button className="px-4 py-2 text-white rounded-md border-solid border bg-blue-400 ml-5">Edit</button>
                                </div>
                                <div>
                                    <button className="px-4 py-2 text-white rounded-md border-solid border bg-blue-400 ml-5">Delete</button>
                                </div>
                            </div>
                        </div>



                        {/* end example */}

                    </div>
                </div>
            </main>
            <Copyright />
        </div>
    );
}
