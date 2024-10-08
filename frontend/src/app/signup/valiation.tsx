// 유효성 검사
"use client"

export async function Valiation(formData: FormData, fieldName?: string) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const checkPassword = formData.get("checkPassword") as string;
  // const nickName = formData.get("nickName") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const birthDate = formData.get("birthDate") as string;

  // Validate only the specified field if provided
  if (fieldName) {
    switch (fieldName) {
      case 'email':
        // const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        if (!email.includes('@')) {
          throw new Error("잘못된 이메일 형식입니다.");
        }
        break;

      case 'password':
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
        if (!passwordRegex.test(password)) {
          // throw new Error("비밀번호 (영문+숫자+특수기호 8자이상20자이내)");
          throw new Error("올바른 형식을 입력해주세요");
        }
        break;

      // case 'nickName':
      //   const nickRegex = /^[A-Za-z0-9]{0,5}$/;
      //   if (!nickRegex.test(nickName)) {
      //     throw new Error("조건을 확인해주세요.");
      //   }
      //   break;

      case 'phoneNumber':
        const phoneRegex = /^\d{11}$/;
        if (!phoneRegex.test(phoneNumber)) {
          throw new Error("올바른 형식을 입력해주세요.");
        }
        break;

      case 'birthDate':
        const birthRegex = /^\d{6}$/;
        if (!birthRegex.test(birthDate)) {
          throw new Error("올바른 형식을 입력해주세요.");
        }
        break;

      case 'checkPassword':
        if (checkPassword !== password) {
          throw new Error("비밀번호가 일치하지 않습니다.")
        }
    }
  } else {
  }
}



