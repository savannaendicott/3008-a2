# Basic pulling in of csv files for now.

blank_pts <- read.csv(file="Blankpt28_log.csv", head=TRUE,sep=",")
summary(blank_pts)
blank_pts$event
text28 <- read.csv(file="Text28_log.csv", head=TRUE,sep=",")

img_pts <- read.csv(file="Imagept28_log.csv", head=TRUE,sep=",")
