//hashmap:<Monday-Friday>,<timestamp>
//parse string into array, [start-time, end-time,Monday-Friday]
export const parseClassMeets = (meet) => {
    let cur = meet.split(' ');
    let res = cur[1].split('-');
    res.push(cur[0]);
    return res;
};
//return -1 if t1 < t2, 0 for equality, 1 for t1 > t2
//input is string format like this "12:43"
export const compareTwoTimes = (time1, time2) => {
    let time1_array = time1.split(':');
    let time2_array = time2.split(':');
    let time1_hour = Number(time1_array[0]);
    let time1_min = Number(time1_array[1]);
    let time2_hour = Number(time2_array[0]);
    let time2_min = Number(time2_array[1]);
    if(time1_hour >time2_hour){
        return 1;
    }else if(time1_hour < time2_hour){
        return -1;
    }else{
        if(time1_min > time2_min){
            return 1;
        }else if(time1_min < time2_min){
            return -1;
        }else{
            return 0;
        }
    }
}
//return true or false if it has conflict
export const hasConflict = (cur_meet, list) => {
    let cur_meet_array = parseClassMeets(cur_meet.meets);
    for(let i = 0; i<list.length; i++){
        if((cur_meet.term === list[i].term
            &&cur_meet.number === list[i].number
            &&cur_meet.title === list[i].title)
            ||cur_meet.term !== list[i].term){
                //if the cur course is the same one in the list, skip this 
                continue;
            }
        let selected_course = list[i].meets;
        let cur_selected_course = parseClassMeets(selected_course);
        if(cur_selected_course[2] === cur_meet_array[2]  
            || cur_selected_course[2].includes(cur_meet_array[2])
            || cur_meet_array[2].includes(cur_selected_course[2])){

            if(compareTwoTimes(cur_selected_course[0],cur_meet_array[0])<=0 
            && compareTwoTimes(cur_selected_course[1],cur_meet_array[1])>=0){
                console.log("nested");
                return true;
            }
            if(compareTwoTimes(cur_selected_course[0],cur_meet_array[0])>=0
            &&compareTwoTimes(cur_selected_course[0],cur_meet_array[1])<=0){
                console.log("left bound");
                return true;
            }
            if(compareTwoTimes(cur_selected_course[1],cur_meet_array[0])>=0 
            &&compareTwoTimes(cur_selected_course[1],cur_meet_array[1])<=0){
                
                console.log("right bound");
                return true;
            }
            if(compareTwoTimes(cur_selected_course[0],cur_meet_array[0])>=0
            &&compareTwoTimes(cur_selected_course[1],cur_meet_array[1])<=0){
                //debug
                console.log("This is start:"+cur_selected_course[0] + ",This is start2:" + cur_meet_array[0] );
                console.log("This is end:"+cur_selected_course[1] + ",This is end2:" + cur_meet_array[1] );
                console.log("Compare: " + compareTwoTimes(cur_selected_course[0],cur_meet_array[0]));
                console.log("overlapped");
                return true;
            }
        }
    }
    return false;
   
}