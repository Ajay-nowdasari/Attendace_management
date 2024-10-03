import React from 'react'

const Footer = () => {
  return (
    <div>
    <footer className="footer bg-dark text-white text-center text-lg-start mt-5" style={{cursor:"pointer"}}>
        
        <div className="container pt-4">
            {/* <!-- Grid row --> */}
            <div className="row">
                {/* <!-- Header --> */}
                <div className="footer_div1 col-lg-6 col-md-12 mb-3 mb-md-0">
                    <h5 className="text-uppercase">Company Name</h5>
                    <p className='m-0'>
                        Here you can add some information about your company. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </div>
                <hr className='ftr_hr mt-0'/>

                {/* <!-- links --> */}
                <div className="col-lg-3 footer_div col-md-6 mb-4 mb-md-0 footer_links">
                    <h5 className="text-uppercase">Links</h5>

                    <ul className="list-unstyled mb-0 d-flex">
                        <li>
                            <a href="#!" className="text-white">
                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                            <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{stopColor: "#F58529", stopOpacity: "1"}} />
                                <stop offset="30%" style={{stopColor: "#DD2A7B", stopOpacity: "1"}} />
                                <stop offset="60%" style={{stopColor: "#8134AF", stopOpacity: "1"}} />
                                <stop offset="100%" style={{stopColor: "#515BD4", stopOpacity: "1"}} />
                            </linearGradient>

                            </defs>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="url(#grad1)"/>
                                <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="url(#grad1)"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill="url(#grad1)"/>
                            </svg>
                            </a>
                        </li>
                        <li>
                            <a href="#!" className="text-white">
                            <svg width="33px" height="33px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="24" cy="24" r="20" fill="#1DA1F2"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M36 16.3086C35.1177 16.7006 34.1681 16.9646 33.1722 17.0838C34.1889 16.4742 34.9697 15.5095 35.3368 14.36C34.3865 14.9247 33.3314 15.3335 32.2107 15.5551C31.3123 14.5984 30.0316 14 28.6165 14C25.8975 14 23.6928 16.2047 23.6928 18.9237C23.6928 19.3092 23.7368 19.6852 23.8208 20.046C19.7283 19.8412 16.1005 17.8805 13.6719 14.9015C13.2479 15.6287 13.0055 16.4742 13.0055 17.3766C13.0055 19.0845 13.8735 20.5916 15.1958 21.4747C14.3878 21.4491 13.6295 21.2275 12.9647 20.8587V20.9203C12.9647 23.3066 14.663 25.296 16.9141 25.7496C16.5013 25.8616 16.0661 25.9224 15.6174 25.9224C15.2998 25.9224 14.991 25.8912 14.6902 25.8336C15.3166 27.7895 17.1357 29.2134 19.2899 29.2534C17.6052 30.5733 15.4822 31.3612 13.1751 31.3612C12.7767 31.3612 12.3848 31.338 12 31.2916C14.1791 32.6884 16.7669 33.5043 19.5475 33.5043C28.6037 33.5043 33.5562 26.0016 33.5562 19.4956C33.5562 19.282 33.5522 19.0693 33.5418 18.8589C34.5049 18.1629 35.34 17.2958 36 16.3086Z" fill="white"/>
                            </svg>
                            </a>
                        </li>
                        <li>
                            <a href="#!" className="text-white">
                            <svg width="33px" height="33px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_87_7208)"/>
                                <path d="M21.2137 20.2816L21.8356 16.3301H17.9452V13.767C17.9452 12.6857 18.4877 11.6311 20.2302 11.6311H22V8.26699C22 8.26699 20.3945 8 18.8603 8C15.6548 8 13.5617 9.89294 13.5617 13.3184V16.3301H10V20.2816H13.5617V29.8345C14.2767 29.944 15.0082 30 15.7534 30C16.4986 30 17.2302 29.944 17.9452 29.8345V20.2816H21.2137Z" fill="white"/>
                                <defs>
                                <linearGradient id="paint0_linear_87_7208" x1="16" y1="2" x2="16" y2="29.917" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#18ACFE"/>
                                <stop offset="1" stop-color="#0163E0"/>
                                </linearGradient>
                                </defs>
                            </svg>
                            </a>
                        </li>
                        <li>
                            <a href="#!" className="text-white">
                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="url(#grad2)" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: "#00C6FF", stopOpacity: "1" }} />  {/* Light Blue */}
                                        <stop offset="50%" style={{ stopColor: "#0066FF", stopOpacity: "1" }} /> {/* Dark Blue */}
                                        <stop offset="100%" style={{ stopColor: "#D930AB", stopOpacity: "1" }} /> {/* Pinkish Purple */}
                                    </linearGradient>
                                </defs>
                                <path 
                                    fill-rule="evenodd" 
                                    clip-rule="evenodd" 
                                    d="M12.0015 2C6.36855 2 1.99997 6.12644 1.99997 11.7011C1.99997 14.6169 3.19537 17.1356 5.1402 18.8751C5.30189 19.0215 5.40074 19.2238 5.4084 19.4444L5.46357 21.2245C5.46753 21.3554 5.50362 21.4833 5.56865 21.5969C5.63368 21.7106 5.72567 21.8065 5.8365 21.8762C5.94733 21.9459 6.07361 21.9873 6.2042 21.9968C6.3348 22.0062 6.46572 21.9834 6.58541 21.9303L8.57085 21.0552C8.7402 20.9816 8.92794 20.9671 9.10418 21.0146C10.0161 21.2651 10.9869 21.4008 11.9984 21.4008C17.6314 21.4008 22 17.2751 22 11.7004C22 6.12644 17.6322 2 12.0015 2ZM17.2528 9.57854L14.7486 13.5502C14.6544 13.6997 14.5302 13.8281 14.3839 13.9272C14.2376 14.0263 14.0724 14.0941 13.8986 14.1262C13.7248 14.1583 13.5462 14.154 13.3742 14.1137C13.2021 14.0734 13.0403 13.9979 12.8988 13.892L10.9065 12.3992C10.8178 12.3329 10.71 12.2971 10.5992 12.2971C10.4884 12.2971 10.3807 12.3329 10.2919 12.3992L7.6038 14.4398C7.24748 14.7119 6.77621 14.282 7.0153 13.9034L9.51951 9.9318C9.61375 9.7823 9.73793 9.65394 9.88424 9.55481C10.0305 9.45568 10.1958 9.38793 10.3696 9.35582C10.5434 9.32371 10.7219 9.32795 10.894 9.36826C11.066 9.40857 11.2279 9.48408 11.3693 9.59004L13.3617 11.0828C13.4504 11.149 13.5582 11.1849 13.6689 11.1849C13.7797 11.1849 13.8875 11.149 13.9762 11.0828L16.6643 9.04215C17.0245 8.76628 17.4958 9.19617 17.2528 9.57854Z" 
                                    stroke="url(#grad2)" 
                                    stroke-linejoin="round"
                                />
                            </svg>


                            </a>
                        </li>
                    </ul>
                </div>
                
                <hr className='ftr_hr mt-0'/>

                {/* <!-- contact --> */}
                <div className="footer_nav col-lg-3 col-md-6">
                    <h5 className="text-uppercase">Contact</h5>

                    <ul className="list-unstyled">
                        <li>
                            <p><i className="fas fa-home"></i> Andhra Pradesh, Rajahmundry, Bommuru</p>
                        </li>
                        <li>
                            <p><i className="fas fa-envelope"></i> gmr@gmail.com</p>
                        </li>
                        <li>
                            <p><i className="fas fa-phone"></i> +91 765 893 **** </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="text-center p-2 bg-secondary">
            © 2024 Copyright :
            <a className="text-white" href="https://example.com/"> nothing.com </a>
        </div>

    </footer> 
    </div>
  )
}

export default Footer;