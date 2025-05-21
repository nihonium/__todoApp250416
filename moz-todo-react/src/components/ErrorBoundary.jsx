import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // エラー発生時に state を更新してフォールバック UI を表示
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // エラーログ送信や localStorage のクリアなど
    console.error('Rendering error caught:', error);
    localStorage.clear(); // ← ここで localStorage を全削除
  }

  render() {
    if (this.state.hasError) {
      return <h1>エラーが発生しました。</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;