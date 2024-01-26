import styled from "styled-components";

export const BranchInfoWriteView = styled.div`
  
  
  .bi-write-main {
    height: 400px;
    width: 1160px;
    margin: 10% auto;
    
    .section-select {
      
    }
    
    .section-list {
      
    }
    
    .section-submit {
      
      .submit-image-attach {
        position: relative;

        .image-preview-item {
          height: 100px;
          width: 100px;
          margin-right: 3px;
          border: ${({theme}) => theme.borderColor};
          border-radius: 20px;
        }

        .image-delete {
          position: absolute;
          top: 10px;
          left: 83px;
          color: orangered;
          cursor: pointer;
        }
      }
      
      .submit-image-button {
        
      }
    }
    
    .section-image {
      
      .bis-list {
        padding-bottom: 50px;

        .bis-item {
          position: relative;
          height: 380px;
          @media screen and (max-width: 1024px) {
            height: 250px;
          }
          width: 550px;
          color: white;
          font-weight: bold;
          cursor: pointer;

          img {
            height: 100%;
            width: 100%;
            border: none;
            border-radius: 10px;
            object-fit: cover;
            vertical-align: top;
          }
          
          .image-delete {
            position: absolute;
            top: 10px;
            right: 10px;
            color: orangered;
            cursor: pointer;
          }
        }
      }
    }
  }
`;

export const BranchInfoListView = styled.div`

  .top-btn {
    position: fixed;
    bottom: 40px;
    right: 40px;
    height: 50px;
    width: 50px;
    border: 1px solid ${({theme}) => theme.boxBgColor};
    border-radius: 50%;
    background-color: ${({theme}) => theme.boxBgColor};
    color: ${({theme}) => theme.textColor};;
    text-align: center;
    z-index: 99;
    cursor: pointer;

    .icon-custom {
      position: relative;
      top: 12px;
      font-size: 25px;
    }
  }

  .bi-sub-view {
    height: 100%;
    width: 100%;
    background: rgba(216,201,201,0.5);

    .bi-sub {
      width: 1160px;
      @media screen and (max-width: 1280px) {
        width: 100%;
        padding: 62px 0 80px;
      }
      padding: 82px 0 150px;
      margin: 0 auto;
      text-align: center;

      .bi-sub-title {
        margin: 7% auto 0;
        font-size: 48px;
        @media screen and (max-width: 1024px) {
          font-size: 32px;
        }
      }
    }
  }
  
  .bi-view-main {
    width: 1160px;
    margin: 2% auto 10%;
    @media screen and (max-width: 1280px) {
      box-sizing: border-box;
      width: 100%;
      padding: 0 20px;
    }
    
    .bi-main-category {
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid ${({theme}) => theme.rgbaLight};
      @media screen and (max-width: 1024px) {
        justify-content: left;
        flex-wrap: wrap;
        font-size: 14px;
      }

      .bi-category-item {
        width: auto;
        padding: 20px 32px;
        font-size: 18px;
        line-height: 26px;
        letter-spacing: -.2px;
        text-align: center;
        cursor: pointer;
      }
      
      .bi-category-item.active {
        width: auto;
        padding: 20px 32px;
        border-bottom: 2px solid ${({theme}) => theme.rgbaBold};
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        cursor: pointer;
      }
    }
    
    .bi-main-image {
      margin-top: 24px;
      
      .bis-list {
        
        .bis-item {
          position: relative;
          height: 780px;
          @media screen and (max-width: 1280px) {
            height: 550px;
          }
          width: 100%;
          color: white;
          font-weight: bold;
          cursor: pointer;

          img {
            height: 100%;
            width: 100%;
            border: none;
            border-radius: 10px;
            object-fit: cover;
            vertical-align: top;
          }
        }
      }
    }
    
    .bi-main-info {
      display: flex;
      padding-bottom: 60px;
      margin: 50px 0 100px 0;
      border-bottom: 1px solid ${({theme}) => theme.rgbaLight};
      
      .info-item {
        width: calc(100% /3);
        padding-top: 50px;
        font-size: 16px;
        line-height: 26px;
        letter-spacing: -.4px;
        text-align: center;
        
        .icon-custom {
          margin-bottom: 20px;
          font-size: 40px;
        }
      }
      
      .info-position {
        
      }
      
      .info-contact {
        
      }
      
      .info-room {
        
      }
    }

    .bi-main-map {
      @media screen and (max-width: 1280px) {
        box-sizing: border-box;
        width: 100%;
        padding: 0 20px;
      }

      .bi-map-title {
        margin-bottom: 30px;
        font-size: 24px;
        font-weight: bold;
        line-height: 32px;
        letter-spacing: -.6px;
      }
    }
  }
`;