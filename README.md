# Bài toán 1 
![](https://github.com/anhpv-0367/reactjs-demo/blob/master/1.png)
- Tạo 1 ô input nhập cho phép nhập `username`, Sau khi nhập xong click Enter 
- Sử dụng axios để gọi API lấy ra list repo public của `username` truyền vào
- Thêm Chức năng loadmore (API github hỗ trợ 1 trang 30 phần tử )

-------------
# Bài toán 2
- Với list repos vừa get ra được thêm thông tin stargazers bên cạnh. Click vào stargazers sẽ ra được list những stargazers đang follow repo đó
- Phân trang cho list stargazers


![](https://github.com/anhpv-0367/reactjs-demo/blob/master/2.png)

Các thư viện sử dụng:
- redux-starter-kit: https://github.com/reduxjs/redux-starter-kit
- react-redux
- axios: https://github.com/axios/axios

Một số chú ý:
 - components: Chỉ thực hiện những phần hiển thị views
 - containers: Viết các hàm connect(),truyền state, dispatch action đến các component
 - service: Viết các function GET API, support
 - store/repo.slice.js: Khai báo cấu trúc state bằng cách createSlice (redux-starter-kit support), viết reducers trong slice này.
 - ultils/http.js: Nhiệm vụ khai báo baseUrl
