import { Box } from "@mui/material"


export const MainDisplay = ({ children }) => {
    return(
        <>
            <Box component="main" id="mainDisplay" sx={{ flex: '1 1 auto'}}>
                {children}
            </Box>
        </>
    )
}

export const Layout = ({ children }) => {
    return(
        <>
            <Box id="rootLayout" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                {children}
            </Box>
        </>
    )
}