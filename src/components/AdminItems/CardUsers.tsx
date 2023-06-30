// import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
// import { Box } from "@mui/system";
// import Typography from "@mui/material/Typography";
// import CardActions from "@mui/material/CardActions";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import LanguageIcon from "@mui/icons-material/Language";
// import { Button } from "@mui/material";

// export const CardUsers = ({ user: { name, age, email } }) => {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: { xs: "column", md: "row" },
//         alignItems: "center",
//         width: { xs: "100%", sm: "100%", md: "90%" },
//       }}
//     >
//       <Card
//         sx={{
//           width: { xs: "90%", sm: "70%", md: "400px" },
//           height: 400,
//           mt: "5rem",
//           backgroundColor: "#0f203b",
//           boxShadow: " 0 0 2px 6px",
//           color: "black",
//         }}
//       >
//         <CardMedia
//           className="imgProject"
//           component="img"
//           height="100%"
//           //   image="https://img.freepik.com/vector-premium/caricatura-divertido-perrito-sentado_29190-6858.jpg?w=2000"
//           alt="project"
//         />
//       </Card>
//       <Box
//         sx={{
//           position: "relative",
//           backgroundColor: "#0f203b",
//           width: { xs: "90%", sm: "70%", md: "400px" },
//           mt: "2rem",
//           ml: { md: "4rem" },
//           justifyContent: "center",

//           textAlign: "start",
//         }}
//       >
//         <Typography fontSize={"30px"} variant="h3" color="white">
//           {name}
//         </Typography>

//         <Typography
//           sx={{ mt: "1rem" }}
//           variant="h4"
//           color="white"
//           fontSize="20px"
//         >
//           {age}
//         </Typography>
//         <Typography
//           sx={{ mt: "1rem", color: "green" }}
//           variant="h4"
//           color="white"
//           fontSize="20px"
//         >
//           asd
//         </Typography>
//         <Typography
//           sx={{ mt: "1rem" }}
//           variant="h4"
//           color="white"
//           fontSize="20px"
//         >
//           {email}
//         </Typography>
//         <CardActions
//           disableSpacing
//           sx={{
//             display: "flex",
//             justifyContent: "start",
//             gap: "30px",
//             mt: "1rem",
//           }}
//         >
//           <Button
//             variant="contained"
//             color="success"
//             sx={{ boxShadow: " 0 0 0 4px", color: "black" }}
//           >
//             <Box sx={{ display: "flex", gap: "5px" }}>
//               <Typography
//                 sx={{ display: "flex", gap: "5px", alignItems: "center" }}
//                 fontSize={{ xs: "12px", sm: "14px", md: "16px" }}
//                 color={"white"}
//               >
//                 <LanguageIcon />
//               </Typography>
//             </Box>
//           </Button>

//           <Button
//             variant="contained"
//             color="success"
//             sx={{ boxShadow: " 0 0 0 4px", color: "black" }}
//           >
//             <Box>
//               <Typography
//                 sx={{ display: "flex", gap: "5px", alignItems: "center" }}
//                 fontSize={{ xs: "12px", sm: "14px", md: "16px" }}
//                 color={"white"}
//               >
//                 <GitHubIcon />
//               </Typography>
//             </Box>
//           </Button>
//         </CardActions>
//       </Box>
//     </Box>
//   );
// };
// export default CardUsers;
