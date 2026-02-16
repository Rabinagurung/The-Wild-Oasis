import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

/**
 * Creating your own custom api endpoint because we dont have to expose or Supabase API endpoint to these affiliates. 
 * Not that common anymore because of Sever actions
 * Easily aggegrate different data sources from parts of Supabase API that are not publicly accessible. 
 * Keep API keys hidden
 * Easy way to use abstraction for someone who might consume data in a custom way.
 * 
 * http://localhost:3000/api/cabins/1002
 * 
 * 
 * @param {*} request 
 * @param {*} param1 
 * @returns 
 */
export async function GET(request, {params}) {
    
    const {cabinId} = params;
    //Fetch all the data of this specific cabin and get all booked dates

    try {
    const[cabin, bookedDates] = await Promise.all([getCabin(cabinId), getBookedDatesByCabinId(cabinId)])

    return Response.json({cabin, bookedDates})
    
    } catch (error) {
        return Response.json({message: "Cabin not found"})
    }
   
}

