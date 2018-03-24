//
// import React from 'react'
//
// import Friends from './Friends'
//
// import VerticalMenu from './VerticalMenu'
// class Sidebar extends React.Component {
//   // state = {
//   //   visible: false
//   // }
//   constructor(props) {
//     super(props);
//     this.state = {
//        visible: false
//     }
//   }
//
//   toggleVisibility = () => {
//     this.setState({
//       visible: !this.state.visible
//     }, () => console.log(this.state.visible))
//   }
//
//   render(){
//     return(
//       <div>
//         <button onClick={this.toggleVisibility}>See Friends</button>
//           <VerticalMenu/>
//           {this.state.visible ?
//             <div className="pusher">
//               <Friends/>
//             </div>
//         : null }
//       </div>
//     )
//   }
//
// }
//
// export default Sidebar
