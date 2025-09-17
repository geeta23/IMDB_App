import React from "react";

function Pagination({pageNo, nextFun, prevFun}){

    return (<>
            <div className="bg-gray-400 p-4 h-[50px] w-full mt-8 flex justify-center gap-2">
                <div onClick={prevFun} className="px-8 hover:cursor-pointer">
                    <i class="fa-solid fa-arrow-left"></i>
                </div>
                <div>{pageNo}</div>
                <div onClick={nextFun} className="px-8 hover:cursor-pointer">
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
            </div>
    </>
    );
}

export default Pagination;