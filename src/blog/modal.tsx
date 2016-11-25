/// <reference path="../index.d.ts" />

export class BlogModal extends React.Component<any, any>{

    render() {
        return (
            <div id="modal" className="modal">
                <div className="modal-content">
                    <span className="modal-close">×</span>
                    <p>Some text in the Modal..</p>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const modalClose = document.getElementsByClassName("modal-close")[0] as HTMLDivElement;
        const modal = document.getElementById("modal") as HTMLDivElement;

        modalClose.addEventListener("click", function(){
            modalClose.style.display = "none";
        });

        window.addEventListener("click", function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }
}

// document.addEventListener("DOMContentLoaded", function () {
//     ReactDOM.render(
//         <BlogModal />,
//         document.getElementById("modal")
//     );  
// })