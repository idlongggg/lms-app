export interface School {
  id: string;
  name: string;
  logo: string;
}

export const mockSchools: School[] = [
  {
    id: "1",
    name: "THPT Chuyên Lê Hồng Phong",
    logo: "https://ui-avatars.com/api/?name=LHP&background=random",
  },
  {
    id: "2",
    name: "THPT Chuyên Trần Đại Nghĩa",
    logo: "https://ui-avatars.com/api/?name=TDN&background=random",
  },
  {
    id: "3",
    name: "THPT Nguyễn Thượng Hiền",
    logo: "https://ui-avatars.com/api/?name=NTH&background=random",
  },
  {
    id: "4",
    name: "THPT Gia Định",
    logo: "https://ui-avatars.com/api/?name=GD&background=random",
  },
  {
    id: "5",
    name: "THPT Mạc Đĩnh Chi",
    logo: "https://ui-avatars.com/api/?name=MDC&background=random",
  },
  {
    id: "6",
    name: "Vinschool Central Park",
    logo: "https://ui-avatars.com/api/?name=VCP&background=random",
  },
];
