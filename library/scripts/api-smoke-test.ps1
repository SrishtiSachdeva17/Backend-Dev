$ErrorActionPreference = "Stop"

$base = "http://localhost:3000/api"
$random = Get-Random
$email = "alice$random@example.com"
$password = "pass1234"

Write-Host "Signing up..."
$signupBody = @{
    name = "Alice"
    email = $email
    password = $password
    membershipType = "Gold"
} | ConvertTo-Json
$signup = Invoke-RestMethod -Method Post -Uri "$base/signup" -ContentType "application/json" -Body $signupBody

Write-Host "Logging in..."
$loginBody = @{
    email = $email
    password = $password
} | ConvertTo-Json
$login = Invoke-RestMethod -Method Post -Uri "$base/login" -ContentType "application/json" -Body $loginBody
$token = $login.data.token

Write-Host "Creating a book..."
$bookBody = @{
    title = "The Odyssey"
    author = "Homer"
    price = 250
} | ConvertTo-Json
$book = Invoke-RestMethod -Method Post -Uri "$base/books" -ContentType "application/json" -Headers @{ Authorization = "Bearer $token" } -Body $bookBody

Write-Host "Borrowing the book..."
$borrowBody = @{
    memberId = $signup.data.id
    bookIds = @($book.data._id)
} | ConvertTo-Json -Depth 3
$borrow = Invoke-RestMethod -Method Post -Uri "$base/borrow" -ContentType "application/json" -Headers @{ Authorization = "Bearer $token" } -Body $borrowBody

Write-Host "Fetching summary..."
$summary = Invoke-RestMethod -Method Get -Uri "$base/summary/$($borrow.data.record._id)" -Headers @{ Authorization = "Bearer $token" }

Write-Host "OK"
$signup
$login
$book
$borrow
$summary
