import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-user-score-list',
  templateUrl: './user-score-list.component.html',
  styleUrl: './user-score-list.component.css'
})
export class UserScoreListComponent implements OnInit{




  userScores:any[]=[];
  filteredScores:any[]=[];
  searchTerm:string='';
  


constructor(private route:Router,private questionService:QuestionService){}



  ngOnInit(): void {
    this.loadUserScores();

  }

  deleteScore(id:any):void{
    this.questionService.deleteScore(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.loadUserScores();
        
      },error:(err)=>{
        console.error(err);
        
      }
    })

  }


  loadUserScores(){
    this.questionService.getUserScores().subscribe((data:any[])=>{
      this.userScores=data;
      this.filteredScores=[...this.userScores];
      console.log(this.filteredScores);
      

      console.log(this.userScores);
      
    });
  }



//   searchScores():void{
// if(this.searchTerm.length>3){
//   this.filteredScores=this.userScores.filter(userScore=>
//     userScore.firstName.toLowerCase().includes(this.searchTerm.toLowerCase())|| userScore.lastName.toLowerCase().includes(this.searchTerm.toLowerCase())
//   );
// }else{
//   this.filteredScores=[...this.userScores];
// }


//   }


// search(firstNameTerm: string, lastNameTerm: string): void {
//   // Convert both search terms to lowercase to make the search case-insensitive
//   const firstNameLower = firstNameTerm ? firstNameTerm.toLowerCase() : '';
//   const lastNameLower = lastNameTerm ? lastNameTerm.toLowerCase() : '';

//   // Perform filtering based on both or either first name or last name
//   this.filteredScores = this.userScores.filter((score) => {
//     const firstNameMatches = score.firstName.toLowerCase().includes(firstNameLower);
//     const lastNameMatches = score.lastName.toLowerCase().includes(lastNameLower);

//     // Check if both search terms are provided, or match either first or last name
//     if (firstNameLower && lastNameLower) {
//       return firstNameMatches && lastNameMatches;
//     } else {
//       return firstNameMatches || lastNameMatches;
//     }
//   });
// }



// search(searchTerm: string): void {
//   // Trim whitespace and convert to lowercase for case-insensitive search
//   const trimmedTerm = searchTerm.trim().toLowerCase();

//   // Check if the search term is at least 3 characters long
//   if (trimmedTerm.length < 3) {
//     this.filteredScores = [...this.userScores]; // Reset filtered scores if input is less than 3 characters
//     return;
//   }

//   // Perform filtering based on the search term
//   this.filteredScores = this.userScores.filter((score) => {
//     const firstNameMatches = score.firstName.toLowerCase().includes(trimmedTerm);
//     const lastNameMatches = score.lastName.toLowerCase().includes(trimmedTerm);

//     // Return true if the search term matches either first name or last name
//     return firstNameMatches || lastNameMatches;
//   });
// }


search(searchTerm: string): void {
  // Trim whitespace and convert to lowercase for case-insensitive search
  const trimmedTerm = searchTerm.trim().toLowerCase();

  // Check if the search term is at least 3 characters long
  if (trimmedTerm.length < 3) {
    this.filteredScores = [...this.userScores]; // Reset filtered scores if input is less than 3 characters
    return;
  }

  // Split the search term into first name and last name
  const nameParts = trimmedTerm.split(' ');
  const firstNamePart = nameParts[0];
  const lastNamePart = nameParts.length > 1 ? nameParts[1] : ''; // Get the last name if it exists

  // Perform filtering based on the first name and last name
  this.filteredScores = this.userScores.filter((score) => {
    const firstNameMatches = score.firstName.toLowerCase().includes(firstNamePart);
    const lastNameMatches = score.lastName.toLowerCase().includes(lastNamePart);

    // Return true if both first name and last name match
    return firstNameMatches && lastNameMatches;
  });
}








}
