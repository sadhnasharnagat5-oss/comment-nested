import { Component ,EventEmitter,Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() totalItem:any=0;
  @Input() limit:any=10;
  @Input()skip :Number=10;
  @Output() paginateEvent= new EventEmitter();

  page:any[]=[];
  currentPage:any=0;
  totalPageNumber:any=0
  ngOnChanges(){
    this.calculatePagination()
  }
  calculatePagination(){
    this.totalPageNumber=Math.ceil(this.totalItem/this.limit);
    console.log("totalPageNumber",this.totalPageNumber);
    for(let i=0;i<=this.totalPageNumber;i++){
      this.page.push(i+1)
    }
  }
  onPageClick(index:any){
    this.currentPage=index;
     this.calculateDataSet(this.currentPage)
    console.log(this.currentPage)

  }
  clickPre(){
    if(this.currentPage>0){
       this.currentPage=this.currentPage -1;
        this.calculateDataSet(this.currentPage)
    
    }
    console.log(this.currentPage)
   


  }
  clickNext(){
    if(this.currentPage<this.totalPageNumber){
      this.currentPage=this.currentPage + 1;
      this.calculateDataSet(this.currentPage)
     
    }
     console.log(this.currentPage,this.totalPageNumber)
   

  }
  calculateDataSet(index:any){
    this.skip=index * this.limit;
    let pageData={
      limit:this.limit,
      skip:this.skip
    }
    this.paginateEvent.emit(pageData)

  }


}
