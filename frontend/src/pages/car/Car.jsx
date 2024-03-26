import { Card } from "@/components/ui/card"
import DateDialog from "./DateDialog";
import Images from "./Images";
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from 'react-router-dom';


const Car = () => {
  const { carId } = useParams();
  const [pickUp, setPickUp] = useState()
  const [dropOff, setDropOff] = useState()
  const [hoursDifference, setHoursDifference] = useState(null);

  const handleBook = async () => {
    try {
			const response = await axios.post(
				"/api/cars",
				JSON.stringify({...values, images: imagesUrl}),
				{
					headers: {
						"Content-Type": "application/json",
						authorization: token,
					},
				}
			);
			toast.success("Your Car Added successfully.");
		} catch (e) {
			toast.error(e.response.data.message);
			if (e.response.data.message1) {
				setTimeout(() => {
					toast.info(e.response.data.message1);
				}, 6002);
			}
		}
  }

  useEffect(() => {
    const timeDifferenceInMs = dropOff && pickUp  && dropOff.getTime() -  pickUp.getTime();
    const hoursDiff = Math.floor(timeDifferenceInMs / (1000 * 60 * 60));
    setHoursDifference(hoursDiff);
  }, [pickUp, dropOff])

    return (
      <div className="flex max-w-full justify-center items-center 2xl:max-w-[1500px] h-full max-[1020px]:pb-[100px] ">
        <div className="flex flex-col max-w-full lg:flex-row space-y-6 p-10">
          <div className="flex flex-col space-y-10 justify-center justify-center items-center px-4 w-full max-w-full p-1">
            <Images />
            <Card className="max-w-[900px] border-none shadow-lg p-6 rounded-lg space-y-5">
              <div className="w-full flex justify-between items-center pb-3 border-b">
                <h1 className="text-2xl font-medium pl-1">2022 - Toyota Camry</h1>
                {false ? <p className="p-2 mr-2 text-green-600 text-xs bg-green-600/20 rounded-3xl">Available</p> 
                : <p className="p-2 mr-2 text-yellow-600 text-xs bg-yellow-500/20 rounded-3xl">Unavailable</p>
}
              </div>
              <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 pl-1">
                <div className="w-full flex items-center">
                    <p className="text-lg font-medium	  pr-2">Brand Name:</p>
                    <p className="text-lg font-normal	">Toyota</p>
                  </div>
                <div className="w-full flex items-center">
                <p className="text-lg font-medium	  pr-2">Model:</p>
                <p className="text-lg font-normal	  ">Camry</p>
                </div>
              </div>
              <div className="flex flex-col justify-evenly sm:flex-row space-y-6 sm:space-y-0 pl-1">
                <div className="w-full flex items-center">
                  <p className="text-lg font-medium pr-2">Year:</p>
                  <p className="text-lg font-normal	">2022</p>
                </div>
                <div className="w-full flex items-center">
                  <p className="text-lg font-medium	 pr-2">Type:</p>
                  <p className="text-lg font-normal	">Sedan</p>
                </div>
              </div>
              <div className="flex flex-col justify-evenly sm:flex-row space-y-6 sm:space-y-0 pl-1">
                <div className="w-full flex items-center">
                  <p className="text-lg font-medium pr-2">Color:</p>
                  <p className="text-lg font-normal	">Black</p>
                </div>
                <div className="w-full flex items-center">
                  <p className="text-lg font-medium	 pr-2">Price per hour:</p>
                  <p className="text-lg font-normal	">$20</p>
                </div>
              </div>
              <hr />
              <div className="pl-2">
                  <p className="text-xl font-medium pb-2">Description</p>
                  <p className="text-lg text-left font-normal	">Own the road with the stunning [Year] [Car Make] [Car Model]. This well-maintained beauty offers a thrilling drive with its [engine specification] and [mention a comfort or handling feature]. Immerse yourself in a luxurious cabin featuring [mention interior material] and [mention technology feature]. Perfect for adventures, it provides ample space and comfort.</p>
              </div>
              <hr />
              <div className="pl-2">
                  <p className="text-xl font-medium pb-5">Owner</p>
                  <div className="w-full flex items-center space-x-6">
                    <img
													className="h-[60px] w-[60px] rounded-full object-cover"
													src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
													alt="Owner photo"
												/>
                    <p className="text-lg font-medium	">Ismail Ali</p>
                  </div>
              </div>
              <hr />
              <div className="flex justify-center items-center">
                <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">4.95</p>
                <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                <a href="#" className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">73 reviews</a>
              </div>
            </Card>
          </div>
          <div className="flex flex-col px-4 w-full max-w-full space-y-10 lg:w-[40%]">
          <Card className="max-w-full flex flex-col space-y-4 border-none shadow-lg p-6 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="w-2 h-2 block rounded-full bg-blue-900/40"></span>
              <h1 className="text-xl font-medium text-blue-900">Pick-up</h1>
            </div>
            {pickUp ? <p className="pl-6 text-sm font-normal	">{pickUp.toLocaleString()}</p> :<Skeleton className="h-5 w-[200px]" />}
            <div className="flex items-center space-x-3">
              <span className="w-2 h-2 block rounded-full bg-blue-900/40"></span>
              <h1 className="text-xl font-medium text-blue-900">Drop-off</h1>
            </div>
            {dropOff ? <p className="text-sm font-normal pl-6	">{dropOff.toLocaleString()}</p> :<Skeleton className="h-5 w-[200px]" />}
            <DateDialog
              pickUp={pickUp}
              setPickUp={setPickUp}
              dropOff={dropOff}
              setDropOff={setDropOff}
            />
          </Card>
          <Card className="max-w-full border-none shadow-lg p-6 rounded-lg space-y-2">
            
            <h1 className="text-2xl font-medium text-blue-900 pb-5">Price Summary</h1>
            <div className="w-full flex justify-between items-center pb-1">
                  <p className="text-lg font-medium	 pr-2">Price per hour</p>
                  <p className="text-xl font-medium	">$20</p>
            </div>
            <p className="pb-4">The price is all-inclusive of service fees and taxes.</p>
            <div className="w-full flex justify-between items-center pb-3">
                  <p className="text-lg font-medium	 pr-2">Discount</p>
                  <p className="text-xl font-medium	">0%</p>
            </div>
            <hr />
            <div className="w-full flex justify-between items-center pt-4 pb-8">
                  <p className="text-xl font-medium	 pr-2">Total Amount</p>
                  {hoursDifference ? <p className="text-2xl font-medium	">${hoursDifference * 20}</p> : <Skeleton className="h-8 w-[60px]" />}
            </div>
            <Button 
              className="text-lg w-full"
              disabled={!pickUp || !dropOff}
              onClick={handleBook}
            >Book Now</Button>
          </Card>
        </div>
        </div>
        </div>
        
    );
}

export default Car;