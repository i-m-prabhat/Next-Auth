export default function UserProfile({params}:any){
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <p>Profile Page 
                <span className="p-2 rounded bg-orange-500 mt-2 text-black">
                    {params.id}
                    </span>
                    </p>
        </div>
    )
}