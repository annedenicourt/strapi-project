import { Gruppo, Inter, Quicksand } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const gruppo_init = Gruppo({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
export const quicksand_init = Quicksand({
  subsets: ["latin"],
  weight: "400",
  //display: "swap",
});

export const gruppo = gruppo_init.className;
export const quicksand = quicksand_init.className;
