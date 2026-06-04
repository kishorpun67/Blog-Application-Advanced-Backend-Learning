


declare global {
    namespace  Express {
        interface Request {
            userId: String
        }
    }
}
export {}

// declare global {
//     namespace Express {
//       interface Request {
//         user?: {
//           id: string
//           email: string
//           role: string
//         }
//       }
//     }
//   }
  
//   export {}